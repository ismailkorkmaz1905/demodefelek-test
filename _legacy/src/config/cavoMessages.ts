export const cavoMessages = {
  roomCreated: ['Oda hazır cavo.', 'Cavoları çağır.', 'Kod hazır, ekibi topla cavo.', 'Oda kuruldu cavo.'],
  playerJoin: ['Yeni cavo geldi.', 'Yarışmacı bağlandı.', 'Oyuncu bağlandı.', 'Ekip tamamlanıyor cavo.'],
  gameStart: ['Başlıyoruz cavo.', 'ÇARKIFELEK sahnede.', 'Hazır mısınız cavolar?', 'İlk tur açılıyor cavo.'],
  yourTurn: ['Sıra sende cavo.', 'Hadi cavo, göster kendini.', 'Çark seni bekliyor cavo.', 'Bu tur senin cavo.'],
  spinRequest: ['Çevir cavo!', 'Çarkı çevir.', 'Hadi çark dönsün cavo.', 'Şansını dene cavo.'],
  wheelResult: ['Çark döndü cavo.', 'Sonuç geldi.', 'Çark kararını verdi cavo.', 'Segment hazır.'],
  correctLetter: ['Bildin cavo!', 'Harf geldi cavo.', 'Güzel yakaladın cavo.', 'Devam cavo!'],
  incorrectLetter: ['Olmadı cavo.', 'Bu harf yok cavo.', 'Sıra gitti cavo.', 'Bir dahaki tur cavo.'],
  duplicateLetter: ['Bu harf daha önce seçildi.', 'Tekrar harf olmaz cavo.', 'Bu kapı kapandı.', 'Başka harf seç cavo.'],
  correctAnswer: ['Yapıştırdın cavo!', 'Cevap doğru.', 'Tur senin cavo.', 'Harika çözüm cavo.'],
  incorrectAnswer: ['Geçersiz cevap.', 'Cevap tutmadı cavo.', 'Olmadı, sıra değişiyor.', 'Bir dahaki çözümde cavo.'],
  bankruptcy: ['İflas cavo!', 'Puanlar uçtu cavo.', 'Çark acımadı cavo.', 'Bu tur yaktın cavo.'],
  pass: ['Pas geçildi.', 'Sıra değişti cavo.', 'Devam ediyoruz.', 'Çark pas dedi cavo.'],
  timeout: ['Süre doldu.', 'Zaman bitti cavo.', 'Sıra değişiyor.', 'Hız lazım cavo.'],
  roundWin: ['Turun sahibi belli.', 'Bu tur sende cavo.', 'Puanlar kasaya.', 'Güzel tur cavo.'],
  finalStart: ['Final başlıyor cavo!', 'Son düzlüğe geldik.', 'İki cavo kaldı.', 'Şampiyonluk turu.'],
  gameWin: ['Gecenin cavosu belli oldu!', 'Şampiyon cavo!', 'Tahtın sahibi belli cavo.', 'ÇARKIFELEK şampiyonu!'],
  disconnect: ['Bağlantı kesildi.', 'Oyuncu yeniden bağlanıyor.', 'Oyuncu beklemede.', 'Oyuncuyu bekliyoruz.'],
  reconnect: ['Geri döndü cavo.', 'Bağlantı yenilendi.', 'Oyuncu aktif.', 'Devam cavo.'],
  intermission: ['5 dakika ara cavo.', 'Kısa mola.', 'Sahne birazdan döner.', 'Ara başladı cavo.'],
  hostOverride: ['Sunucu işlemi uygulandı.', 'Host müdahalesi kaydedildi.', 'Yayın kontrolü güncellendi.', 'Acil işlem tamamlandı.'],
  encouragement: ['Devam cavo.', 'Oyun kızışıyor.', 'Güzel gidiyoruz cavo.', 'Sahne senin.'],
} as const

export type CavoMessageGroup = keyof typeof cavoMessages

export function pickCavoMessage(group: CavoMessageGroup, index = 0, slangMode = true) {
  if (!slangMode) {
    return cavoMessages[group][0].replace(/\s?cavo[.!]?/gi, '.').replace(/\s+/g, ' ').trim()
  }
  const messages = cavoMessages[group]
  return messages[index % messages.length]
}
