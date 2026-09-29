export const topics = [
  {
    id: "algebra",
    name: "Algebra",
    color: "coral",
    description: "Ifodalar ichidagi qonuniyatni toping.",
    formula: "x^2+y^2",
    subtitle: "Tenglamalar · Tengsizliklar",
  },
  {
    id: "geometry",
    name: "Geometriya",
    color: "blue",
    description: "Chizing. Kuzating. Isbotlang.",
    formula: "a^2+b^2=c^2",
    subtitle: "Shakllar · Burchaklar",
  },
  {
    id: "numbers",
    name: "Sonlar nazariyasi",
    color: "violet",
    description: "Oddiy sonlarning noodatiy xossalari.",
    formula: "a\\equiv b\\pmod n",
    subtitle: "Bo‘linish · Qoldiqlar",
  },
  {
    id: "combinatorics",
    name: "Kombinatorika",
    color: "mint",
    description: "Imkoniyatlarni tartib bilan sanang.",
    formula: "\\binom{n}{k}",
    subtitle: "Sanash · Mantiq",
  },
] as const;
export type TopicId = (typeof topics)[number]["id"];
export type Problem = {
  slug: string;
  id: string;
  title: string;
  topic: TopicId;
  level: "Boshlang‘ich" | "O‘rta" | "Murakkab";
  minutes: number;
  description: string;
  statement: string;
  formula: string;
  hints: string[];
  solution: { title: string; text: string; formula?: string }[];
  answer?: number;
  takeaway: string;
};
export const problems: Problem[] = [
  {
    slug: "sample",
    id: "001",
    title: "Ketma-ket sonlar siri",
    topic: "numbers",
    level: "Boshlang‘ich",
    minutes: 10,
    description: "Uchta qo‘shni son. Har doim bir xil xossa.",
    statement:
      "Istalgan uchta ketma-ket butun sonning ko‘paytmasi 6 ga bo‘linishini isbotlang. Bu yerda n — ixtiyoriy butun son.",
    formula: "6\\mid n(n+1)(n+2)",
    hints: [
      "Uchta ketma-ket son ichida kamida bitta juft son bor.",
      "Uchta ketma-ket sonning 3 ga bo‘lgandagi qoldiqlarini ko‘rib chiqing.",
    ],
    solution: [
      {
        title: "Juft sonni topamiz",
        text: "Ketma-ket ikkita butun sondan biri juft. Shuning uchun uchta ketma-ket sonning ko‘paytmasi 2 ga bo‘linadi.",
      },
      {
        title: "3 ga bo‘linishni tekshiramiz",
        text: "Uchta ketma-ket sonning 3 ga bo‘lgandagi qoldiqlari qandaydir tartibda 0, 1 va 2 bo‘ladi. Ulardan biri 3 ga bo‘linadi.",
      },
      {
        title: "Ikki kuzatuvni birlashtiramiz",
        text: "2 va 3 o‘zaro tub. Demak, ikkalasiga ham bo‘linadigan ko‘paytma 6 ga bo‘linadi.",
      },
    ],
    takeaway: "Murakkab bo‘linishni o‘zaro tub bo‘luvchilarga ajratish mumkin.",
  },
  {
    slug: "katta-daraja",
    id: "002",
    title: "Katta daraja, kichik qoldiq",
    topic: "numbers",
    level: "O‘rta",
    minutes: 8,
    description: "2026 marta ko‘paytirish shartmi?",
    statement: "7 ning 2026-darajasini 6 ga bo‘lganda qanday qoldiq qoladi?",
    formula: "7^{2026}\\pmod 6",
    hints: [
      "7 ni 6 ga bo‘lganda qoldiq 1.",
      "Qoldiqlarni ko‘paytirish qoidasidan foydalaning.",
    ],
    solution: [
      {
        title: "Asosni soddalashtiramiz",
        text: "7 soni 6 ga bo‘lganda 1 qoldiq beradi.",
        formula: "7\\equiv1\\pmod6",
      },
      {
        title: "Darajaga ko‘taramiz",
        text: "1 ning istalgan natural darajasi yana 1. Javob: 1.",
        formula: "7^{2026}\\equiv1^{2026}=1\\pmod6",
      },
    ],
    answer: 1,
    takeaway: "Katta sonni hisoblash o‘rniga uning qoldig‘i bilan ishlang.",
  },
  {
    slug: "oxirgi-raqam",
    id: "003",
    title: "Oxirgi raqam qayerda?",
    topic: "numbers",
    level: "O‘rta",
    minutes: 12,
    description: "Darajalar ichidagi to‘rt qadamli sikl.",
    statement: "3 ning 2026-darajasining oxirgi raqamini toping.",
    formula: "3^{2026}",
    hints: [
      "3, 9, 27, 81, 243 sonlarining oxirgi raqamlarini yozing.",
      "Oxirgi raqamlar har 4 qadamda takrorlanadi. 2026 ni 4 ga bo‘ling.",
    ],
    solution: [
      {
        title: "Siklni topamiz",
        text: "3 ning ketma-ket darajalarining oxirgi raqamlari 3, 9, 7, 1. So‘ng sikl qaytadan boshlanadi.",
      },
      {
        title: "Sikldagi o‘rinni aniqlaymiz",
        text: "2026 = 4 × 506 + 2. Demak, siklning ikkinchi raqami kerak: 9.",
      },
    ],
    answer: 9,
    takeaway:
      "Takrorlanuvchi jarayonda darajaning o‘zi emas, sikldagi o‘rni muhim.",
  },
  {
    slug: "yashirin-kvadrat",
    id: "004",
    title: "Yashirin kvadrat",
    topic: "algebra",
    level: "O‘rta",
    minutes: 10,
    description: "x ni topmasdan javobga yetib boring.",
    statement:
      "Nolga teng bo‘lmagan haqiqiy x soni uchun x + 1/x = 3. x² + 1/x² ifodaning qiymatini toping.",
    formula: "x+\\frac1x=3",
    hints: [
      "Tenglikning ikkala tomonini kvadratga ko‘taring.",
      "(a + b)² = a² + 2ab + b² formulasini eslang.",
    ],
    solution: [
      {
        title: "Kvadratga ko‘taramiz",
        text: "O‘rtadagi ko‘paytma x × (1/x) = 1 ga teng.",
        formula: "x^2+2+\\frac1{x^2}=9",
      },
      {
        title: "Kerakli ifodani ajratamiz",
        text: "Ikkala tomondan 2 ni ayiramiz. Javob: 7.",
        formula: "x^2+\\frac1{x^2}=7",
      },
    ],
    answer: 7,
    takeaway:
      "Noma’lumni topish har doim ham zarur emas. Kerakli ifodani bevosita o‘zgartiring.",
  },
  {
    slug: "eng-kichik-qiymat",
    id: "005",
    title: "Muvozanatdagi minimum",
    topic: "algebra",
    level: "Murakkab",
    minutes: 15,
    description: "Yig‘indi o‘zgarmasa, kvadratlar qanday o‘zgaradi?",
    statement:
      "a va b musbat haqiqiy sonlar hamda a + b = 10. a² + b² ning eng kichik qiymatini toping.",
    formula: "a+b=10,\\qquad\\min(a^2+b^2)=?",
    hints: [
      "(a − b)² doimo manfiy bo‘lmaydi.",
      "2(a² + b²) = (a + b)² + (a − b)² tenglikni ishlating.",
    ],
    solution: [
      {
        title: "Kvadratning xossasi",
        text: "(a − b)² ≥ 0 bo‘lgani uchun quyidagi tengsizlik o‘rinli.",
        formula: "2(a^2+b^2)=(a+b)^2+(a-b)^2\\ge100",
      },
      {
        title: "Chegaraga erishamiz",
        text: "Demak, a² + b² ≥ 50. a = b = 5 bo‘lganda 25 + 25 = 50. Eng kichik qiymat: 50.",
      },
    ],
    answer: 50,
    takeaway:
      "Minimumni topishda chegarani isbotlang va unga erishilishini ko‘rsating.",
  },
  {
    slug: "toq-sonlar",
    id: "006",
    title: "Toq sonlardan kvadrat",
    topic: "algebra",
    level: "Boshlang‘ich",
    minutes: 8,
    description: "1 + 3 + 5 + … nimani chizadi?",
    statement:
      "Birinchi 20 ta musbat toq sonning yig‘indisini toping: 1 + 3 + 5 + … + 39.",
    formula: "1+3+5+\\cdots+39",
    hints: [
      "Birinchi bir nechta yig‘indilar: 1, 4, 9, 16.",
      "1 dan 39 gacha 20 ta toq son bor. Birinchi va oxirgisini juftlang.",
    ],
    solution: [
      {
        title: "Juftlab hisoblaymiz",
        text: "1 + 39 = 40, 3 + 37 = 40 va hokazo. 20 ta sondan 10 ta juft hosil bo‘ladi.",
      },
      {
        title: "Umumiy qonuniyat",
        text: "Yig‘indi 10 × 40 = 400. Umuman, birinchi n ta musbat toq son yig‘indisi n².",
        formula: "1+3+\\cdots+(2n-1)=n^2",
      },
    ],
    answer: 400,
    takeaway:
      "Sonlarni rasm yoki qulay juftliklar orqali ko‘rish hisobni soddalashtiradi.",
  },
  {
    slug: "uch-burchak",
    id: "007",
    title: "Uch burchak, bitta nisbat",
    topic: "geometry",
    level: "Boshlang‘ich",
    minutes: 8,
    description: "Uchburchak burchaklari sizga nimani aytadi?",
    statement:
      "Uchburchakning ichki burchaklari 2 : 3 : 4 nisbatda. Eng katta burchakning gradus o‘lchovini toping.",
    formula: "\\alpha:\\beta:\\gamma=2:3:4",
    hints: [
      "Burchaklarni 2k, 3k va 4k deb belgilang.",
      "Uchburchak ichki burchaklarining yig‘indisi 180° ga teng.",
    ],
    solution: [
      {
        title: "Tenglama tuzamiz",
        text: "2k + 3k + 4k = 180°, shuning uchun 9k = 180° va k = 20°.",
      },
      {
        title: "Eng katta burchak",
        text: "Eng katta burchak 4k = 80°. Qolganlari 40° va 60°.",
      },
    ],
    answer: 80,
    takeaway: "Nisbatni bitta umumiy ko‘paytuvchi orqali yozish qulay.",
  },
  {
    slug: "togri-uchburchak",
    id: "008",
    title: "Ikki katetning maydoni",
    topic: "geometry",
    level: "Boshlang‘ich",
    minutes: 5,
    description: "6 va 8 — yuza uchun yetarli ma’lumot.",
    statement:
      "To‘g‘ri burchakli uchburchakning katetlari 6 sm va 8 sm. Uning yuzini sm² da toping.",
    formula: "a=6,\\quad b=8,\\quad S=?",
    hints: [
      "To‘g‘ri burchakli uchburchakda katetlardan biri asos, ikkinchisi balandlik bo‘ladi.",
      "Uchburchak yuzi — asos va balandlik ko‘paytmasining yarmi.",
    ],
    solution: [
      {
        title: "Asos va balandlik",
        text: "Katetlar o‘zaro perpendikulyar. Demak, asos 6 sm bo‘lsa, unga tushirilgan balandlik 8 sm.",
      },
      {
        title: "Yuzani hisoblaymiz",
        text: "Yuza 24 sm² ga teng.",
        formula: "S=\\frac12\\cdot6\\cdot8=24",
      },
    ],
    answer: 24,
    takeaway: "Formuladan oldin asosga mos balandlikni aniqlang.",
  },
  {
    slug: "aylana-ichidagi-tortburchak",
    id: "009",
    title: "Aylana ichidagi maksimum",
    topic: "geometry",
    level: "Murakkab",
    minutes: 20,
    description: "Qaysi to‘g‘ri to‘rtburchak eng ko‘p joy egallaydi?",
    statement:
      "Radiusi 5 sm bo‘lgan aylanaga to‘g‘ri to‘rtburchak ichki chizilgan. Uning mumkin bo‘lgan eng katta yuzini sm² da toping.",
    formula: "R=5,\\qquad\\max S=?",
    hints: [
      "To‘g‘ri to‘rtburchak diagonali aylana diametriga teng.",
      "Tomonlari a va b bo‘lsa, a² + b² = 100. (a − b)² ≥ 0 dan foydalaning.",
    ],
    solution: [
      {
        title: "Diagonalni ishlatamiz",
        text: "Ichki chizilgan to‘g‘ri to‘rtburchak diagonali diametrga teng: 10 sm. Pifagor teoremasidan a² + b² = 100.",
      },
      {
        title: "Yuzani chegaralaymiz",
        text: "(a − b)² ≥ 0 dan 2ab ≤ a² + b² = 100. Demak, ab ≤ 50.",
      },
      {
        title: "Tenglik holati",
        text: "a = b = 5√2 bo‘lganda to‘rtburchak kvadrat bo‘ladi va yuzi 50 sm². Bu chegara erishiladi.",
      },
    ],
    answer: 50,
    takeaway:
      "Geometriyadagi maksimum ba’zan oddiy algebraik tengsizlikka keladi.",
  },
  {
    slug: "salomlashuvlar",
    id: "010",
    title: "Beshta do‘st uchrashdi",
    topic: "combinatorics",
    level: "Boshlang‘ich",
    minutes: 7,
    description: "Har bir qo‘l siqishni faqat bir marta sanang.",
    statement:
      "5 ta do‘st uchrashdi. Har biri qolgan har bir do‘sti bilan bir martadan qo‘l siqib salomlashdi. Jami nechta qo‘l siqish bo‘ldi?",
    formula: "\\binom52=?",
    hints: [
      "Har bir kishi 4 kishi bilan salomlashadi.",
      "5 × 4 hisobida har bir qo‘l siqish necha marta sanalgan?",
    ],
    solution: [
      {
        title: "Barcha ishtiroklarni sanaymiz",
        text: "5 kishining har biri 4 marta qo‘l siqadi: 20 ta ishtirok.",
      },
      {
        title: "Takrorlarni chiqaramiz",
        text: "Bitta qo‘l siqishda ikki kishi qatnashadi. Shuning uchun 20 ni 2 ga bo‘lamiz: 10.",
        formula: "\\frac{5\\cdot4}{2}=10",
      },
    ],
    answer: 10,
    takeaway: "Sanashda bir xil obyekt takror hisoblanmaganini tekshiring.",
  },
  {
    slug: "eng-qisqa-yol",
    id: "011",
    title: "Eng qisqa yo‘llar",
    topic: "combinatorics",
    level: "O‘rta",
    minutes: 12,
    description: "Manzil bitta. Unga olib boradigan yo‘llar-chi?",
    statement:
      "Katakli maydonda A dan B ga yetish uchun 3 qadam o‘ngga va 2 qadam yuqoriga yurish kerak. Faqat shu yo‘nalishlarda yurilsa, nechta turli yo‘l bor?",
    formula: "\\binom52",
    hints: [
      "Har bir yo‘l 5 qadamdan iborat.",
      "Yuqoriga yuriladigan 2 ta qadamning o‘rnini tanlang.",
    ],
    solution: [
      {
        title: "Yo‘lni ketma-ketlikka aylantiramiz",
        text: "Har bir yo‘l 3 ta O‘ (o‘ngga) va 2 ta Y (yuqoriga) harfidan iborat.",
      },
      {
        title: "Ikki o‘rinni tanlaymiz",
        text: "5 ta o‘rindan 2 tasini Y uchun tanlash yetarli. Qolganlari O‘ bo‘ladi.",
        formula: "\\binom52=\\frac{5\\cdot4}{2}=10",
      },
    ],
    answer: 10,
    takeaway:
      "Geometrik yo‘lni harflar ketma-ketligiga aylantirib sanash mumkin.",
  },
  {
    slug: "tugilgan-oylar",
    id: "012",
    title: "13 kishi, 12 oy",
    topic: "combinatorics",
    level: "O‘rta",
    minutes: 10,
    description: "Hisoblamasdan mavjudligini isbotlang.",
    statement:
      "13 kishidan iborat guruhda kamida ikki kishi bir xil oyda tug‘ilganini isbotlang. Tug‘ilgan yil va kunning ahamiyati yo‘q.",
    formula: "13>12",
    hints: [
      "Har bir oy uchun alohida quti bor deb tasavvur qiling.",
      "Agar har oyda ko‘pi bilan bittadan kishi tug‘ilgan bo‘lsa, jami nechta kishi bo‘la oladi?",
    ],
    solution: [
      {
        title: "Teskarisini faraz qilamiz",
        text: "Hech bir oyda ikki kishi tug‘ilmagan, ya’ni har oyda ko‘pi bilan bitta kishi tug‘ilgan bo‘lsin.",
      },
      {
        title: "Qarama-qarshilik",
        text: "12 oy uchun bu ko‘pi bilan 12 kishi degani. Ammo guruhda 13 kishi bor. Demak, kamida bir oyga kamida ikki kishi to‘g‘ri keladi.",
      },
    ],
    takeaway:
      "Dirixle prinsipi: n ta qutiga n dan ortiq buyum joylansa, bir qutida kamida ikkita buyum bo‘ladi.",
  },
];
export const topicFor = (id: TopicId) => topics.find((t) => t.id === id)!;
export const lessons = [
  {
    id: "algebra",
    title: "Ifodani boshqacha ko‘ring",
    topic: "algebra" as TopicId,
    minutes: 6,
    description: "Qisqa ko‘paytirish formulalari — yodlashdan tushunishga.",
    formula: "(a+b)^2=a^2+2ab+b^2",
    parts: [
      {
        title: "Kvadratning ichiga qarang",
        text: "Tomoni a + b bo‘lgan kvadratni a², ab, ab va b² yuzali to‘rtta qismga ajratish mumkin. Shu sababli o‘rtadagi 2ab hadi yo‘qolmaydi.",
      },
      {
        title: "Formulani teskari ishlating",
        text: "Agar a + b va ab ma’lum bo‘lsa, a² + b² ni a va b ni alohida topmasdan hisoblay olasiz: yig‘indining kvadratidan 2ab ni ayiring.",
      },
      {
        title: "Kichik misol",
        text: "a + b = 7 va ab = 10 bo‘lsa, a² + b² = 49 − 20 = 29. Har bir harfning o‘zini topishga ehtiyoj bo‘lmadi.",
      },
    ],
    quiz: "a + b = 5 va ab = 6 bo‘lsa, a² + b² nechaga teng?",
    choices: ["13", "25", "19"],
    correct: 0,
    explanation: "5² − 2 × 6 = 25 − 12 = 13.",
    problem: "yashirin-kvadrat",
  },
  {
    id: "geometry",
    title: "Burchaklar tilini o‘rganing",
    topic: "geometry" as TopicId,
    minutes: 5,
    description: "Bitta chizma, uchta burchak va 180°.",
    formula: "\\alpha+\\beta+\\gamma=180^\\circ",
    parts: [
      {
        title: "Yig‘indi o‘zgarmaydi",
        text: "Tekislikdagi har qanday uchburchakning ichki burchaklari yig‘indisi 180°. Shakli o‘zgarsa ham, bu qoida saqlanadi.",
      },
      {
        title: "Noma’lumni ajrating",
        text: "Ikki burchak 50° va 60° bo‘lsa, uchinchisi 180° − 50° − 60° = 70° bo‘ladi. Chizma taxmin qilishga yordam beradi, ammo hisob uni asoslaydi.",
      },
      {
        title: "Nisbat bilan ishlang",
        text: "Burchaklar 1 : 2 : 3 nisbatda bo‘lsa, ularni k, 2k, 3k deb yozing. 6k = 180° dan k = 30° chiqadi.",
      },
    ],
    quiz: "Ikki ichki burchak 35° va 65°. Uchinchi burchak nechaga teng?",
    choices: ["90°", "80°", "100°"],
    correct: 1,
    explanation: "180° − 35° − 65° = 80°.",
    problem: "uch-burchak",
  },
  {
    id: "numbers",
    title: "Qoldiq — kichik kalit",
    topic: "numbers" as TopicId,
    minutes: 7,
    description: "Katta sonlarni kichik qoldiqlar orqali tushuning.",
    formula: "17\\equiv2\\pmod5",
    parts: [
      {
        title: "Qoldiq nimani bildiradi?",
        text: "17 = 3 × 5 + 2. Demak, 17 ni 5 ga bo‘lganda qoldiq 2. 17 ≡ 2 (mod 5) yozuvi shuni bildiradi.",
      },
      {
        title: "Qo‘shish va ko‘paytirish",
        text: "Bir xil modul bo‘yicha qoldiqlarni qo‘shish yoki ko‘paytirish mumkin. Natijani yana o‘sha modulga keltiring: 17 × 8 soni 5 bo‘yicha 2 × 3 = 6, ya’ni 1 qoldiq beradi.",
      },
      {
        title: "Darajalar uchun qo‘llang",
        text: "6 ≡ 1 (mod 5) bo‘lgani uchun 6 ning istalgan natural darajasi 5 ga bo‘lganda 1 qoldiq beradi.",
      },
    ],
    quiz: "23 × 12 ni 5 ga bo‘lganda qanday qoldiq qoladi?",
    choices: ["0", "2", "1"],
    correct: 2,
    explanation: "23 ≡ 3 va 12 ≡ 2. 3 × 2 = 6 ≡ 1 (mod 5).",
    problem: "katta-daraja",
  },
  {
    id: "combinatorics",
    title: "Tartib bilan sanang",
    topic: "combinatorics" as TopicId,
    minutes: 6,
    description: "Ko‘paytirish qoidasi va ortiqcha sanashdan qochish.",
    formula: "3\\times2=6",
    parts: [
      {
        title: "Tanlovlarni ajrating",
        text: "3 xil ko‘ylak va 2 xil shim bo‘lsa, har bir ko‘ylakka 2 ta shimdan biri mos keladi. Jami 3 × 2 = 6 ta kiyim juftligi bor.",
      },
      {
        title: "Tartib muhimmi?",
        text: "A va B kishilardan iborat juftlik B va A bilan bir xil. Ammo musobaqada birinchi A, ikkinchi B bo‘lishi, birinchi B va ikkinchi A bo‘lishidan farq qiladi.",
      },
      {
        title: "Har birini bir marta sanang",
        text: "4 kishidan 2 kishilik jamoa tanlashda 4 × 3 = 12 hisobi har bir jamoani ikki marta sanaydi. Haqiqiy javob: 12 ÷ 2 = 6.",
      },
    ],
    quiz: "4 xil ichimlik va 3 xil shirinlikdan bittadan tanlashning nechta usuli bor?",
    choices: ["7", "12", "24"],
    correct: 1,
    explanation: "Har bir ichimlik uchun 3 xil shirinlik: 4 × 3 = 12.",
    problem: "salomlashuvlar",
  },
];
