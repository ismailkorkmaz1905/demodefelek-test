import { useState } from 'react'
import { Download, Mic2, Play, RotateCw, Shield, Timer, Volume2 } from 'lucide-react'
import { Link, Navigate, Route, Routes, useParams, useSearchParams } from 'react-router-dom'
import { brand } from './config/brand'
import { showTimeline } from './config/game'
import { wheelSegments, type WheelSegment } from './config/wheel'
import { samplePuzzles } from './data/puzzles'
import { maskPuzzle, turkishKeyboard } from './domain/puzzle'
import { displayedTotalScore } from './domain/scoring'
import { useDemoGameStore } from './stores/demoGameStore'
import './App.css'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <nav className="top-nav">
        <Link to="/" className="brand-lockup">
          <span className="brand-mark">{brand.appName}</span>
          <span>{brand.subtitle}</span>
        </Link>
        <div>
          <Link to="/host">Host</Link>
          <Link to="/join">Katıl</Link>
          <Link to="/stage/K7M4PX">Sahne</Link>
          <Link to="/admin/puzzles">Bulmacalar</Link>
          <Link to="/rules">Kurallar</Link>
        </div>
      </nav>
      {children}
    </main>
  )
}

function LandingPage() {
  return (
    <Shell>
      <section className="hero-stage">
        <div>
          <p className="eyebrow">{brand.subtitle}</p>
          <h1>{brand.appName}</h1>
          <p>{brand.primarySlogan}</p>
          <div className="actions">
            <Link className="button primary" to="/host">
              <Play size={18} /> Oda Kur
            </Link>
            <Link className="button" to="/join">
              <Mic2 size={18} /> Yarışmacı Katıl
            </Link>
          </div>
        </div>
        <Wheel />
      </section>
      <section className="grid three">
        <Feature icon={<Shield />} title="Yayın güvenli" text="Sahne ve yarışmacı ekranları cevapları görmez." />
        <Feature icon={<Timer />} title="2 saatlik akış" text="Hazır yayın preset'i, molalar ve final modu." />
        <Feature icon={<Volume2 />} title="OBS uyumlu" text="1920x1080 sahne, overlay ve ses parametreleri." />
      </section>
    </Shell>
  )
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <article className="panel feature">
      {icon}
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  )
}

function HostPage() {
  const game = useDemoGameStore()
  const canSpin = game.state === 'AWAITING_SPIN'
  const canActInRound = game.state === 'AWAITING_LETTER'
  const roundComplete = game.state === 'ROUND_REVEAL'
  return (
    <Shell>
      <section className="workspace">
        <header className="room-header panel">
          <div>
            <p className="eyebrow">Oda Kodu</p>
            <h1>{game.roomCode}</h1>
            <p className="status">DEMO MODE - Supabase bağlanınca aynı ekran gerçek zamanlı çalışır.</p>
          </div>
          <div className="actions">
            <button onClick={game.createRoom}>Odayı Yenile</button>
            <button onClick={game.startGame}>Oyunu Başlat</button>
            <button onClick={game.toggleSlang}>{game.slangMode ? 'Slang Kapalı' : 'Slang Açık'}</button>
          </div>
        </header>
        <div className="grid host-grid">
          <ContestantsPanel editable />
          <PuzzlePanel host />
          <section className="panel wheel-panel">
            <h2>Çark Kontrol</h2>
            <Wheel />
            <p className="result">{game.wheelLabel}</p>
            <button className="button primary" disabled={!canSpin} onClick={game.spin}>
              <RotateCw size={18} /> Çevir
            </button>
          </section>
          <section className="panel">
            <h2>Yayın Akışı</h2>
            <ol className="timeline">
              {showTimeline.map(([time, label]) => (
                <li key={time}>
                  <strong>{time}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ol>
          </section>
          <section className="panel emergency">
            <h2>Acil Panel</h2>
            <button disabled={roundComplete} onClick={game.nextTurn}>Sırayı Zorla Geç</button>
            <button disabled={!canActInRound}>Harf Aç</button>
            <button disabled={!canActInRound}>Cevabı Aç</button>
            <button>Odayı Yeniden Eşitle</button>
          </section>
          <section className="panel">
            <h2>Olay Kaydı</h2>
            <p aria-live="polite">{game.eventMessage}</p>
          </section>
        </div>
      </section>
    </Shell>
  )
}

function JoinPage() {
  const joinPlayer = useDemoGameStore((state) => state.joinPlayer)
  return (
    <Shell>
      <section className="join panel">
        <h1>Odaya Katıl</h1>
        <input defaultValue="K7M4PX" aria-label="Oda kodu" />
        <input id="nickname" placeholder="Takma ad" aria-label="Takma ad" />
        <button
          className="button primary"
          onClick={() => {
            const input = document.querySelector<HTMLInputElement>('#nickname')
            joinPlayer(input?.value ?? '')
          }}
        >
          Katıl
        </button>
      </section>
    </Shell>
  )
}

function PlayPage() {
  const { roomCode } = useParams()
  const game = useDemoGameStore()
  return (
    <Shell>
      <section className="controller panel">
        <p className="eyebrow">{roomCode}</p>
        <h1>{brand.appName}</h1>
        <PuzzlePanel />
        <p className="event">{game.eventMessage}</p>
        <button className="big-action" disabled={game.state !== 'AWAITING_SPIN'} onClick={game.spin}>
          {brand.primarySlogan.toLocaleUpperCase('tr-TR')}
        </button>
        <Keyboard />
        <SolveBox />
      </section>
    </Shell>
  )
}

function StagePage() {
  const [searchParams] = useSearchParams()
  const overlay = searchParams.get('overlay') === '1'
  const game = useDemoGameStore()
  return (
    <main className={overlay ? 'stage overlay' : 'stage'}>
      <header>
        <div>
          <p>{brand.subtitle}</p>
          <h1>{brand.appName}</h1>
        </div>
        <strong>{brand.primarySlogan}</strong>
      </header>
      <div className="stage-body">
        <Wheel />
        <PuzzlePanel />
      </div>
      <ContestantsPanel compact />
      <div className="stage-event">{game.eventMessage}</div>
    </main>
  )
}

function AdminPuzzlesPage() {
  const [contentTypeFilter, setContentTypeFilter] = useState('all')
  const [speakerFilter, setSpeakerFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [verifiedFilter, setVerifiedFilter] = useState('all')
  const [reviewedFilter, setReviewedFilter] = useState('all')
  const [enabledFilter, setEnabledFilter] = useState('all')
  const [minPopularity, setMinPopularity] = useState(0)
  const [platformFilter, setPlatformFilter] = useState('all')
  const [sourceDateFilter, setSourceDateFilter] = useState('')
  const [maxLength, setMaxLength] = useState(140)
  const unique = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'tr'))
  const filteredPuzzles = samplePuzzles.filter((puzzle) => {
    if (contentTypeFilter !== 'all' && puzzle.contentType !== contentTypeFilter) return false
    if (speakerFilter !== 'all' && puzzle.speaker !== speakerFilter) return false
    if (categoryFilter !== 'all' && puzzle.category !== categoryFilter) return false
    if (verifiedFilter !== 'all' && String(puzzle.verified) !== verifiedFilter) return false
    if (reviewedFilter !== 'all' && String(puzzle.reviewed) !== reviewedFilter) return false
    if (enabledFilter !== 'all' && String(puzzle.enabled) !== enabledFilter) return false
    if (platformFilter !== 'all' && !puzzle.viralPlatforms?.includes(platformFilter)) return false
    if (sourceDateFilter && !puzzle.sourceDate?.startsWith(sourceDateFilter)) return false
    if (puzzle.popularityScore < minPopularity) return false
    return puzzle.characterCount <= maxLength
  })
  const contentTypes = unique(samplePuzzles.map((puzzle) => puzzle.contentType))
  const speakers = unique(samplePuzzles.map((puzzle) => puzzle.speaker))
  const categories = unique(samplePuzzles.map((puzzle) => puzzle.category))
  const platforms = unique(samplePuzzles.flatMap((puzzle) => puzzle.viralPlatforms || []))

  return (
    <Shell>
      <section className="workspace">
        <header className="panel room-header">
          <div>
            <h1>Bulmaca Yönetimi</h1>
            <p className="status">Tüm içerik yayından önce manuel gözden geçirilmelidir.</p>
          </div>
          <button className="button">
            <Download size={18} /> JSON Dışa Aktar
          </button>
        </header>
        <div className="panel puzzle-filters">
          <label>
            İçerik türü
            <select value={contentTypeFilter} onChange={(event) => setContentTypeFilter(event.target.value)}>
              <option value="all">Tümü</option>
              {contentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </label>
          <label>
            Konuşmacı
            <select value={speakerFilter} onChange={(event) => setSpeakerFilter(event.target.value)}>
              <option value="all">Tümü</option>
              {speakers.map((speaker) => <option key={speaker} value={speaker}>{speaker}</option>)}
            </select>
          </label>
          <label>
            Kategori
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="all">Tümü</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <label>
            Kaynak tarihi
            <input value={sourceDateFilter} onChange={(event) => setSourceDateFilter(event.target.value)} placeholder="2025" />
          </label>
          <label>
            Viral platform
            <select value={platformFilter} onChange={(event) => setPlatformFilter(event.target.value)}>
              <option value="all">Tümü</option>
              {platforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
            </select>
          </label>
          <label>
            Popularity score
            <input type="number" min="0" max="100" value={minPopularity} onChange={(event) => setMinPopularity(Number(event.target.value))} />
          </label>
          <label>
            Verified
            <select value={verifiedFilter} onChange={(event) => setVerifiedFilter(event.target.value)}>
              <option value="all">Tümü</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
          <label>
            Reviewed
            <select value={reviewedFilter} onChange={(event) => setReviewedFilter(event.target.value)}>
              <option value="all">Tümü</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
          <label>
            Enabled
            <select value={enabledFilter} onChange={(event) => setEnabledFilter(event.target.value)}>
              <option value="all">Tümü</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
          <label>
            Karakter uzunluğu
            <input type="number" min="35" max="140" value={maxLength} onChange={(event) => setMaxLength(Number(event.target.value))} />
          </label>
        </div>
        <div className="puzzle-table panel">
          {filteredPuzzles.map((puzzle) => (
            <div key={puzzle.id} className="table-row">
              <div>
                <strong>{puzzle.answer}</strong>
                <small>{puzzle.context}</small>
              </div>
              <span>{puzzle.speaker}</span>
              <span>{puzzle.category}</span>
              <span>{puzzle.sourcePublisher}</span>
              <span>{puzzle.sourceDate || '-'}</span>
              <span>{puzzle.viralPlatforms?.join(', ') || '-'}</span>
              <span>{puzzle.viralityEvidence?.join(' / ') || '-'}</span>
              <span>{puzzle.memeNote || '-'}</span>
              <span>{puzzle.popularityScore}</span>
              <span>{puzzle.verified && puzzle.reviewed && puzzle.enabled ? 'Onaylı' : 'Pasif'}</span>
              <span>{puzzle.lastPlayedAt || '-'}</span>
              <span>{puzzle.playCount}</span>
              {puzzle.sourceUrl ? <a href={puzzle.sourceUrl} target="_blank" rel="noreferrer">Kaynak</a> : <span>-</span>}
            </div>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function RulesPage() {
  return (
    <Shell>
      <section className="panel rules">
        <h1>{brand.appName} Kuralları</h1>
        <p>Dört yarışmacı sırayla çark çevirir, harf seçer ve bulmacayı çözmeye çalışır.</p>
        <p>İflas mevcut tur puanını sıfırlar. Pas sırayı geçirir. Doğru çözüm tur puanını toplam puana ekler.</p>
        <p>Ünlü harf 200 puandır. Yanlış cevap 250 puan düşürür ve sıra değişir.</p>
      </section>
    </Shell>
  )
}

function ContestantsPanel({ compact = false, editable = false }: { compact?: boolean; editable?: boolean }) {
  const game = useDemoGameStore()
  const renameContestant = useDemoGameStore((state) => state.renameContestant)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draftName, setDraftName] = useState('')
  const [nameError, setNameError] = useState('')
  const [savingId, setSavingId] = useState<string | null>(null)

  function startNameEdit(playerId: string, nickname: string) {
    if (!editable || savingId) return
    setEditingId(playerId)
    setDraftName(nickname)
    setNameError('')
  }

  function cancelNameEdit() {
    if (savingId) return
    setEditingId(null)
    setDraftName('')
    setNameError('')
  }

  function saveName(playerId: string) {
    if (savingId) return
    setSavingId(playerId)
    setNameError('')
    window.setTimeout(() => {
      const error = renameContestant(playerId, draftName)
      if (error) {
        setNameError(error)
        setSavingId(null)
        return
      }
      setEditingId(null)
      setDraftName('')
      setSavingId(null)
    }, 180)
  }

  return (
    <section className={compact ? 'scorebar' : 'panel'}>
      {!compact && <h2>Yarışmacılar</h2>}
      <div className="contestants">
        {game.contestants.map((player) => (
          <article className={player.seat === game.activeSeat ? 'player active' : 'player'} key={player.id} style={{ borderColor: player.color }}>
            {editable && editingId === player.id ? (
              <div className="name-editor">
                <input
                  value={draftName}
                  maxLength={24}
                  onChange={(event) => setDraftName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') saveName(player.id)
                    if (event.key === 'Escape') cancelNameEdit()
                  }}
                  aria-label="Yarışmacı adı"
                  autoFocus
                />
                <div className="name-actions">
                  <button className="primary" disabled={savingId === player.id} onClick={() => saveName(player.id)}>
                    {savingId === player.id ? 'Kaydediliyor' : 'Kaydet'}
                  </button>
                  <button disabled={savingId === player.id} onClick={cancelNameEdit}>
                    İptal
                  </button>
                </div>
                {nameError && <span className="name-error">{nameError}</span>}
              </div>
            ) : editable ? (
              <button className="player-name" onClick={() => startNameEdit(player.id, player.nickname)}>
                {player.nickname}
              </button>
            ) : (
              <strong className="player-name-readonly">{player.nickname}</strong>
            )}
            <span>Tur: {player.roundScore}</span>
            <span>Toplam: {displayedTotalScore(player.totalScore, player.roundScore)}</span>
            <small>{player.connectionStatus === 'online' ? 'Çevrimiçi' : 'Bağlantı bekleniyor'}</small>
          </article>
        ))}
      </div>
    </section>
  )
}

function PuzzlePanel({ host = false }: { host?: boolean }) {
  const game = useDemoGameStore()
  const cells = maskPuzzle(game.puzzle.answer, game.guessedLetters)
  return (
    <section className="panel puzzle">
      <p className="eyebrow">{game.puzzle.theme} / {game.puzzle.category}</p>
      <h2>{game.puzzle.clue}</h2>
      <div className="board" aria-label="Bulmaca tahtası">
        {cells.map((cell) => (
          <span className={cell.char === ' ' ? 'space' : cell.guessable ? 'tile' : 'punctuation'} key={cell.index}>
            {cell.guessable ? (cell.revealed ? cell.char : '') : cell.char}
          </span>
        ))}
      </div>
      {host && <p className="answer">Cevap: {game.puzzle.answer}</p>}
    </section>
  )
}

function Keyboard() {
  const game = useDemoGameStore()
  const locked = game.state !== 'AWAITING_LETTER'
  return (
    <div className="keyboard">
      {turkishKeyboard.map((letter) => (
        <button key={letter} disabled={locked || game.guessedLetters.includes(letter)} onClick={() => game.guessLetter(letter)}>
          {letter}
        </button>
      ))}
    </div>
  )
}

function SolveBox() {
  const game = useDemoGameStore()
  const locked = game.state !== 'AWAITING_LETTER'
  return (
    <div className="solve">
      <input id="solve" placeholder="Cevabı yaz" aria-label="Cevabı yaz" disabled={locked} />
      <button
        disabled={locked}
        onClick={() => {
          const input = document.querySelector<HTMLInputElement>('#solve')
          game.solve(input?.value ?? '')
        }}
      >
        CEVABI YAPIŞTIR
      </button>
    </div>
  )
}

function Wheel() {
  const wheelLabel = useDemoGameStore((state) => state.wheelLabel)
  const sliceAngle = 360 / wheelSegments.length

  return (
    <div className="wheel" aria-label="Çark">
      <svg className="wheel-face" viewBox="0 0 100 100" aria-hidden="true">
        <g>
          {wheelSegments.map((segment, index) => (
            <path key={segment.id} className="wheel-segment" d={wheelSegmentPath(index, sliceAngle)} fill={segment.color} />
          ))}
        </g>
        <g>
          {wheelSegments.map((segment, index) => (
            <WheelLabel key={`${segment.id}-label`} segment={segment} index={index} sliceAngle={sliceAngle} />
          ))}
        </g>
        <g>
          {wheelSegments.map((segment, index) => {
            const point = polarPoint(index * sliceAngle, 49)
            return <circle key={`${segment.id}-stud`} className="wheel-stud" cx={point.x} cy={point.y} r="1.15" />
          })}
        </g>
      </svg>
      <b>{wheelLabel}</b>
    </div>
  )
}

function WheelLabel({ segment, index, sliceAngle }: { segment: WheelSegment; index: number; sliceAngle: number }) {
  const startAngle = index * sliceAngle
  const endAngle = startAngle + sliceAngle
  const labelAngle = (startAngle + endAngle) / 2
  const lines = splitWheelLabel(segment.label)
  const innerRadius = 22
  const outerRadius = 47
  const labelRadius = innerRadius + (outerRadius - innerRadius) * (lines.length > 1 ? 0.72 : 0.64)
  const point = polarPoint(labelAngle, labelRadius)
  const rotation = labelAngle > 180 ? labelAngle + 90 : labelAngle - 90
  const sizeClass = /^\d+$/.test(segment.label) ? 'numeric-label' : segment.label.length > 8 ? 'long-label' : 'short-label'
  const toneClass = colorLuminance(segment.color) > 0.52 ? 'label-on-light' : 'label-on-dark'
  const lineHeight = segment.label.length > 8 ? 3.65 : 4.3
  const startOffset = -((lines.length - 1) * lineHeight) / 2

  return (
    <g transform={`translate(${point.x.toFixed(2)} ${point.y.toFixed(2)}) rotate(${rotation.toFixed(2)})`}>
      <text className={`wheel-label ${sizeClass} ${toneClass}`}>
        {lines.map((line, lineIndex) => (
          <tspan key={line} x="0" y={(startOffset + lineIndex * lineHeight).toFixed(2)}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  )
}

function wheelSegmentPath(index: number, sliceAngle: number) {
  const startAngle = index * sliceAngle
  const endAngle = startAngle + sliceAngle
  const start = polarPoint(startAngle, 49)
  const end = polarPoint(endAngle, 49)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M 50 50 L ${start.x.toFixed(2)} ${start.y.toFixed(2)} A 49 49 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)} Z`
}

function splitWheelLabel(label: string) {
  if (label === 'SERBEST HARF') return ['SERBEST', 'HARF']
  if (label === 'TEKRAR ÇEVİR') return ['TEKRAR', 'ÇEVİR']
  if (label === 'RAKİPTEN 250') return ['RAKİPTEN', '250']
  return [label]
}

function polarPoint(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180
  return {
    x: 50 + Math.sin(radians) * radius,
    y: 50 - Math.cos(radians) * radius,
  }
}

function colorLuminance(hex: string) {
  const normalized = hex.replace('#', '')
  const red = parseInt(normalized.slice(0, 2), 16) / 255
  const green = parseInt(normalized.slice(2, 4), 16) / 255
  const blue = parseInt(normalized.slice(4, 6), 16) / 255
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/host" element={<HostPage />} />
      <Route path="/host/:roomCode" element={<HostPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/play/:roomCode" element={<PlayPage />} />
      <Route path="/stage/:roomCode" element={<StagePage />} />
      <Route path="/admin/puzzles" element={<AdminPuzzlesPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
