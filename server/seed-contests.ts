export const contests = [
  {
    title: "Birinchi qadam",
    type: "Test",
    color: "violet",
    icon: "target" as const,
    level: "Boshlang‘ich",
    time: 20,
    count: 5,
    description:
      "To‘rtta yo‘nalishdagi asosiy tushunchalarni bir joyda sinash formati.",
    questions: [
      "Sonning 3 ga bo‘linish belgisi",
      "Uchburchakning noma’lum burchagi",
      "Qisqa ko‘paytirish formulasi",
      "Oddiy tanlovlarni sanash",
      "Ketma-ketlik qonuniyati",
    ],
  },
  {
    title: "Geometriya nigohi",
    type: "Test",
    color: "blue",
    icon: "geometry" as const,
    level: "O‘rta",
    time: 30,
    count: 6,
    description:
      "Chizmalarni o‘qing, bog‘lanishlarni ko‘ring va kerakli xossani tanlang.",
    questions: [
      "Burchaklar yig‘indisi",
      "Teng yonli uchburchak",
      "To‘g‘ri burchakli uchburchak yuzi",
      "Pifagor teoremasi",
      "Aylana diametri",
      "Yuzalarni taqqoslash",
    ],
  },
  {
    title: "Mantiq maydoni",
    type: "Olimpiada",
    color: "coral",
    icon: "trophy" as const,
    level: "O‘rta",
    time: 60,
    count: 3,
    description:
      "To‘liq yechim va isbot talab qiladigan uchta turli yo‘nalishdagi masala.",
    questions: [
      "Sonlar nazariyasi — bo‘linish haqida isbot",
      "Algebra — ifodaning eng kichik qiymati",
      "Kombinatorika — sanash strategiyasi",
    ],
  },
  {
    title: "Katta chaqiriq",
    type: "Olimpiada",
    color: "mint",
    icon: "compass" as const,
    level: "Murakkab",
    time: 90,
    count: 3,
    description:
      "Bir nechta g‘oyani birlashtirib yechiladigan chuqurroq masalalar formati.",
    questions: [
      "Geometriya va tengsizliklar",
      "Darajalar va qoldiqlar",
      "Dirixle prinsipi bilan isbot",
    ],
  },
];
