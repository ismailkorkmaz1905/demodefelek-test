create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  created_at timestamptz not null default now()
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  room_code text not null unique check (room_code ~ '^[A-HJ-NP-Z2-9]{6}$'),
  host_user_id uuid not null references auth.users(id),
  status text not null default 'LOBBY',
  current_game_id uuid,
  max_contestants integer not null default 4 check (max_contestants = 4),
  settings jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '8 hours'
);

create table public.room_members (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('host', 'contestant', 'stage')),
  seat_number integer check (seat_number between 1 and 4),
  display_name text not null,
  player_color text,
  connection_status text not null default 'online' check (connection_status in ('online', 'reconnecting', 'disconnected')),
  last_seen_at timestamptz not null default now(),
  joined_at timestamptz not null default now(),
  unique (room_id, user_id)
);

create unique index room_members_room_seat_unique on public.room_members(room_id, seat_number) where seat_number is not null;

create table public.puzzles (
  id uuid primary key default gen_random_uuid(),
  theme text not null,
  category text not null,
  answer text not null,
  normalized_answer text not null,
  clue text,
  difficulty integer not null check (difficulty between 1 and 5),
  enabled boolean not null default true,
  source text not null default 'manual',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.games (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  status text not null default 'LOBBY',
  show_mode text not null default '2 Saatlik ÇARKAVO Yayını',
  current_round_number integer not null default 0,
  active_player_id uuid references public.room_members(id),
  started_at timestamptz,
  finished_at timestamptz,
  paused_at timestamptz,
  settings jsonb not null default '{}',
  version integer not null default 1
);

alter table public.rooms add constraint rooms_current_game_fk foreign key (current_game_id) references public.games(id);

create table public.game_players (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references public.games(id) on delete cascade,
  room_member_id uuid not null references public.room_members(id) on delete cascade,
  seat_number integer not null,
  total_score integer not null default 0,
  round_score integer not null default 0,
  final_eligible boolean not null default false,
  eliminated boolean not null default false,
  turn_order integer not null,
  unique (game_id, room_member_id)
);

create table public.game_rounds (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references public.games(id) on delete cascade,
  round_number integer not null,
  round_type text not null,
  theme text not null,
  puzzle_id uuid not null references public.puzzles(id),
  status text not null,
  revealed_positions jsonb not null default '[]',
  guessed_letters text[] not null default '{}',
  winner_player_id uuid references public.game_players(id),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  metadata jsonb not null default '{}'
);

create table public.wheel_spins (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references public.games(id) on delete cascade,
  round_id uuid not null references public.game_rounds(id) on delete cascade,
  player_id uuid not null references public.game_players(id),
  segment_id text not null,
  segment_value integer,
  rotation_degrees numeric not null,
  request_id uuid not null unique,
  created_at timestamptz not null default now()
);

create table public.answer_attempts (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references public.games(id) on delete cascade,
  round_id uuid not null references public.game_rounds(id) on delete cascade,
  player_id uuid not null references public.game_players(id),
  attempt text not null,
  normalized_attempt text not null,
  result text not null,
  created_at timestamptz not null default now()
);

create table public.game_events (
  id bigint generated always as identity primary key,
  room_id uuid not null references public.rooms(id) on delete cascade,
  game_id uuid references public.games(id) on delete cascade,
  event_type text not null,
  actor_user_id uuid references auth.users(id),
  public_payload jsonb not null default '{}',
  host_payload jsonb,
  created_at timestamptz not null default now()
);

create index room_members_room_id_idx on public.room_members(room_id);
create index games_room_id_idx on public.games(room_id);
create index game_rounds_game_id_idx on public.game_rounds(game_id);
create index game_events_room_id_id_idx on public.game_events(room_id, id desc);

create function public.set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger rooms_set_updated_at before update on public.rooms for each row execute function public.set_updated_at();
create trigger puzzles_set_updated_at before update on public.puzzles for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.rooms enable row level security;
alter table public.room_members enable row level security;
alter table public.puzzles enable row level security;
alter table public.games enable row level security;
alter table public.game_players enable row level security;
alter table public.game_rounds enable row level security;
alter table public.wheel_spins enable row level security;
alter table public.answer_attempts enable row level security;
alter table public.game_events enable row level security;

create policy "profiles own read" on public.profiles for select using (auth.uid() = id);
create policy "profiles own write" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "rooms host manage" on public.rooms for all using (auth.uid() = host_user_id) with check (auth.uid() = host_user_id);
create policy "rooms members read" on public.rooms for select using (exists (select 1 from public.room_members m where m.room_id = rooms.id and m.user_id = auth.uid()));

create policy "members own or host read" on public.room_members for select using (
  user_id = auth.uid() or exists (select 1 from public.rooms r where r.id = room_members.room_id and r.host_user_id = auth.uid())
);
create policy "members insert own" on public.room_members for insert with check (user_id = auth.uid());
create policy "members update own heartbeat" on public.room_members for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "puzzles host read" on public.puzzles for select using (
  exists (select 1 from public.rooms r where r.host_user_id = auth.uid())
);

create policy "games members read" on public.games for select using (
  exists (select 1 from public.room_members m where m.room_id = games.room_id and m.user_id = auth.uid())
);

create policy "events members read public" on public.game_events for select using (
  exists (select 1 from public.room_members m where m.room_id = game_events.room_id and m.user_id = auth.uid())
);

create view public.broadcast_safe_state as
select
  r.room_code,
  g.status,
  g.current_round_number,
  gr.theme,
  gr.status as round_status,
  gr.revealed_positions,
  gr.guessed_letters,
  p.category,
  p.clue
from public.rooms r
join public.games g on g.id = r.current_game_id
left join public.game_rounds gr on gr.game_id = g.id and gr.round_number = g.current_round_number
left join public.puzzles p on p.id = gr.puzzle_id;
