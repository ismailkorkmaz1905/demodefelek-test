import { z } from 'zod'

export const roomCodeSchema = z.string().regex(/^[A-HJ-NP-Z2-9]{6}$/)
export const nicknameSchema = z.string().trim().min(2).max(24)
export const answerSchema = z.string().trim().min(1).max(140)
export const puzzleImportSchema = z.object({
  theme: z.string().min(1),
  category: z.string().min(1),
  contentType: z.enum(['football_quote', 'viral_clip', 'social_media_meme', 'proverb', 'anonymous_saying', 'idiom']),
  speaker: z.string().min(1),
  answer: z.string().min(1),
  clue: z.string().min(1),
  context: z.string().default(''),
  difficulty: z.coerce.number().int().min(1).max(5),
  sourceTitle: z.string().default(''),
  sourcePublisher: z.string().default(''),
  sourceUrl: z.string().default(''),
  sourceDate: z.string().default(''),
  originalSourceUrl: z.string().default(''),
  viralPlatforms: z.array(z.string()).default([]),
  viralityEvidence: z.array(z.string()).default([]),
  memeNote: z.string().default(''),
  verified: z.coerce.boolean().default(false),
  reviewed: z.coerce.boolean().default(false),
  enabled: z.coerce.boolean(),
  isParaphrase: z.coerce.boolean().default(false),
  popularityScore: z.coerce.number().int().min(0).max(100).default(0),
  notes: z.string().default(''),
})
