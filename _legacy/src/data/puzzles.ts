import { normalizeAnswer } from '../domain/puzzle'
import type { MemeQuotePuzzle } from '../domain/types'

const THEME = 'FUTBOL MEMELERİ, EFSANE SÖZLER VE ATASÖZLERİ' as const

type SeedPuzzle = Omit<MemeQuotePuzzle, 'theme' | 'normalizedAnswer' | 'characterCount' | 'wordCount' | 'lastPlayedAt' | 'playCount'>

function puzzle(seed: SeedPuzzle): MemeQuotePuzzle {
  return {
    ...seed,
    theme: THEME,
    normalizedAnswer: normalizeAnswer(seed.answer),
    characterCount: seed.answer.length,
    wordCount: seed.answer.trim().split(/\s+/).length,
    playCount: 0,
  }
}

const classicSource = {
  sourceTitle: 'Türk atasözleri ve deyimleri',
  sourcePublisher: 'Anonim',
  isParaphrase: false,
  popularityScore: 80,
}

const approvedCandidateSource = {
  sourceTitle: '',
  sourcePublisher: '',
  sourceUrl: '',
  isParaphrase: false,
  popularityScore: 0,
  verified: false,
  reviewed: true,
  enabled: false,
} as const

export const samplePuzzles: MemeQuotePuzzle[] = [
  puzzle({ id: 'atasozu-ayagini-yorganina-gore-uzat', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Ayağını yorganına göre uzat', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-damlaya-damlaya-gol-olur', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Damlaya damlaya göl olur', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-sakla-samani-gelir-zamani', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Sakla samanı gelir zamanı', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-ak-akce-kara-gun-icindir', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Ak akçe kara gün içindir', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-bir-elin-nesi-var-iki-elin-sesi-var', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Bir elin nesi var iki elin sesi var', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-tasima-su-ile-degirmen-donmez', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Taşıma su ile değirmen dönmez', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-ne-ekersen-onu-bicersin', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Ne ekersen onu biçersin', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-dost-kara-gunde-belli-olur', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Dost kara günde belli olur', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-gulu-seven-dikenine-katlanir', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Gülü seven dikenine katlanır', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-komsu-komsunun-kulune-muhtactir', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Komşu komşunun külüne muhtaçtır', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-isleyen-demir-isildar', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'İşleyen demir ışıldar', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-agac-yasken-egilir', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Ağaç yaşken eğilir', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-uzum-uzume-baka-baka-kararir', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Üzüm üzüme baka baka kararır', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-yalancinin-mumu-yatsiya-kadar-yanar', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Yalancının mumu yatsıya kadar yanar', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'atasozu-soz-gumusse-sukut-altindir', category: 'Atasözü', contentType: 'proverb', speaker: 'Türk Atasözü', answer: 'Söz gümüşse sükut altındır', clue: 'Saf Türk atasözü', context: 'Yaygın Türk atasözü.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),

  puzzle({ id: 'deyim-agzinda-bakla-islanmamak', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Ağzında bakla ıslanmamak', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-etekleri-zil-calmak', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Etekleri zil çalmak', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-burnundan-solumak', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Burnundan solumak', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-ipe-un-sermek', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'İpe un sermek', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-pireyi-deve-yapmak', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Pireyi deve yapmak', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-kili-kirk-yarmak', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Kılı kırk yarmak', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-gozden-dusmek', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Gözden düşmek', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-gozden-gecirmek', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Gözden geçirmek', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-burnu-havada-olmak', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Burnu havada olmak', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-dilinde-tuy-bitmek', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Dilinde tüy bitmek', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-eli-ayagina-dolasmak', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Eli ayağına dolaşmak', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-kafasina-dank-etmek', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Kafasına dank etmek', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-kuplere-binmek', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Küplere binmek', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 1, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-agzi-kulaklarina-varmak', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Ağzı kulaklarına varmak', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),
  puzzle({ id: 'deyim-nabza-gore-serbet-vermek', category: 'Deyim', contentType: 'idiom', speaker: 'Türk Deyimi', answer: 'Nabza göre şerbet vermek', clue: 'Saf Türk deyimi', context: 'Yaygın Türk deyimi.', difficulty: 2, verified: true, reviewed: true, enabled: true, ...classicSource }),

  puzzle({ id: 'candidate-biz-bitti-demeden-bitmez', category: 'Modern Söz', contentType: 'social_media_meme', speaker: 'Anonim', answer: 'Biz bitti demeden bitmez', clue: 'Onaylı modern söz adayı', context: 'Kaynak doğrulaması bekleyen aday.', difficulty: 1, ...approvedCandidateSource }),
  puzzle({ id: 'candidate-martilarin-yerini-isgal-ettik', category: 'Modern Söz', contentType: 'social_media_meme', speaker: 'Anonim', answer: 'Martıların yerini işgal ettik', clue: 'Onaylı modern söz adayı', context: 'Kaynak doğrulaması bekleyen aday.', difficulty: 2, ...approvedCandidateSource }),
  puzzle({ id: 'candidate-dogrularin-kaderidir-yalnizlik', category: 'Modern Söz', contentType: 'social_media_meme', speaker: 'Anonim', answer: 'Doğruların kaderidir yalnızlık', clue: 'Onaylı modern söz adayı', context: 'Kaynak doğrulaması bekleyen aday.', difficulty: 2, ...approvedCandidateSource }),
  puzzle({ id: 'candidate-sen-seneye-var-misin-mesela', category: 'Modern Söz', contentType: 'social_media_meme', speaker: 'Anonim', answer: 'Sen seneye var mısın mesela', clue: 'Onaylı modern söz adayı', context: 'Kaynak doğrulaması bekleyen aday.', difficulty: 2, ...approvedCandidateSource }),
  puzzle({ id: 'candidate-kargalar-suruyle-kartal-yalniz-ucar', category: 'Modern Söz', contentType: 'social_media_meme', speaker: 'Anonim', answer: 'Kargalar sürüyle, kartal yalnız uçar', clue: 'Onaylı modern söz adayı', context: 'Kaynak doğrulaması bekleyen aday.', difficulty: 2, ...approvedCandidateSource }),
  puzzle({ id: 'candidate-en-kotu-gununde-en-sik-olacaksin', category: 'Modern Söz', contentType: 'social_media_meme', speaker: 'Anonim', answer: 'En kötü gününde en şık olacaksın', clue: 'Onaylı modern söz adayı', context: 'Kaynak doğrulaması bekleyen aday.', difficulty: 2, ...approvedCandidateSource }),
  puzzle({ id: 'candidate-sen-huzunlusun-diye-dunya-durup-sana-yol-vermeyecek', category: 'Modern Söz', contentType: 'social_media_meme', speaker: 'Anonim', answer: 'Sen hüzünlüsün diye dünya durup sana yol vermeyecek', clue: 'Onaylı modern söz adayı', context: 'Kaynak doğrulaması bekleyen aday.', difficulty: 3, ...approvedCandidateSource }),
  puzzle({ id: 'candidate-her-tercih-bir-vazgecistir', category: 'Modern Söz', contentType: 'social_media_meme', speaker: 'Anonim', answer: 'Her tercih bir vazgeçiştir', clue: 'Onaylı modern söz adayı', context: 'Kaynak doğrulaması bekleyen aday.', difficulty: 2, ...approvedCandidateSource }),
  puzzle({ id: 'candidate-insan-en-cok-kendinde-olmayan-seyden-bahseder', category: 'Modern Söz', contentType: 'social_media_meme', speaker: 'Anonim', answer: 'İnsan en çok kendinde olmayan şeyden bahseder', clue: 'Onaylı modern söz adayı', context: 'Kaynak doğrulaması bekleyen aday.', difficulty: 3, ...approvedCandidateSource }),
]

export const activePuzzles = Array.from(
  new Map(
    samplePuzzles
      .filter((puzzle) => puzzle.enabled && puzzle.reviewed && puzzle.verified)
      .map((puzzle) => [puzzle.normalizedAnswer, puzzle]),
  ).values(),
)
