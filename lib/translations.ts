import {platformTranslations} from "./platform-translations";
export type Language = "uz" | "ru" | "en";
type Translation = readonly [russian: string, english: string];
export const translations: Record<string, Translation> = {
  "PLATFORMA RAQAMLARDA": ["ПЛАТФОРМА В ЦИФРАХ", "THE PLATFORM IN NUMBERS"],
  "Hozirgi namuna": ["Текущий прототип", "Current preview"],
  Foydalanuvchilar: ["Пользователи", "Users"],
  "Hisoblar hali ochilmagan": [
    "Регистрация пока закрыта",
    "Registration is not open yet",
  ],
  "Tez kunda": ["Скоро", "Coming soon"],
  "Sinov formatlari namoyishi": [
    "Примеры форматов испытаний",
    "Sample challenge formats",
  ],
  namuna: ["примера", "previews"],
  "Algebra, geometriya va boshqalar": [
    "Алгебра, геометрия и не только",
    "Algebra, geometry and more",
  ],
  "O‘quv resurslari": ["Учебные материалы", "Learning resources"],
  dars: ["урока", "lessons"],
  "Maqola va kitoblar — tez kunda": [
    "Статьи и книги — скоро",
    "Articles and books coming soon",
  ],

  ta: ["", ""],
  "Bosh sahifa": ["Главная", "Home"],
  Masalalar: ["Задачи", "Problems"],
  Sinovlar: ["Соревнования", "Contests"],
  "O‘rganish": ["Обучение", "Learn"],
  "Loyiha haqida": ["О проекте", "About"],
  "Asosiy menyu": ["Основная навигация", "Main navigation"],
  "Mobil menyu": ["Мобильная навигация", "Mobile navigation"],
  "Menyuni ochish": ["Открыть меню", "Open menu"],
  "Menyuni yopish": ["Закрыть меню", "Close menu"],
  "Tungi rejimga o‘tish": ["Включить тёмную тему", "Switch to dark mode"],
  "Kunduzgi rejimga o‘tish": ["Включить светлую тему", "Switch to light mode"],
  "Tilni tanlash": ["Выбрать язык", "Choose language"],
  "Sayt tili": ["Язык интерфейса", "Interface language"],
  Kirish: ["Войти", "Log in"],
  "Kirish / Ro‘yxatdan o‘tish": ["Вход / Регистрация", "Log in / Sign up"],
  "Ro‘yxatdan o‘tish": ["Регистрация", "Sign up"],
  Yopish: ["Закрыть", "Close"],
  "Yana bir kashfiyotga tayyormisiz?": [
    "Готовы к новому открытию?",
    "Ready for another discovery?",
  ],
  "Birinchi qadamingiz shu yerdan.": [
    "Ваш первый шаг — здесь.",
    "Your first step starts here.",
  ],
  "Hisobga kirish usuli": ["Вход или регистрация", "Log in or sign up"],
  "Bu — dizayn namunasi. Hozircha hisob yaratilmaydi va ma’lumot kiritish talab qilinmaydi.":
    [
      "Это макет интерфейса. Аккаунты пока не создаются, вводить личные данные не нужно.",
      "This is a design preview. Accounts cannot be created yet, and no personal information is needed.",
    ],
  Ismingiz: ["Ваше имя", "Your name"],
  "Ism va familiya": ["Имя и фамилия", "First and last name"],
  "Elektron pochta": ["Электронная почта", "Email address"],
  Parol: ["Пароль", "Password"],
  "Kirish — tez kunda": ["Вход — скоро", "Log in — coming soon"],
  "Ro‘yxatdan o‘tish — tez kunda": [
    "Регистрация — скоро",
    "Sign up — coming soon",
  ],
  "Hozircha masalalarni ko‘rish": [
    "Пока можно посмотреть задачи",
    "Explore problems for now",
  ],
  "Masala va darslarning o‘quv mazmuni hozircha o‘zbek tilida.": [
    "Интерфейс переведён. Учебные материалы и примеры пока доступны на узбекском.",
    "The interface is translated. Learning content and examples are currently in Uzbek.",
  ],
  "Asosiy mazmunga o‘tish": ["Перейти к содержимому", "Skip to content"],
  "Bir savoldan boshlanadi.": [
    "Начинается с вопроса.",
    "It starts with a question.",
  ],
  "Yangi fikrga aylanadi.": [
    "Превращается в новую идею.",
    "It becomes a new idea.",
  ],
  "Kashf eting": ["Откройте для себя", "Explore"],
  "Masalalar kutubxonasi": ["Библиотека задач", "Problem library"],
  "Qisqa darslar": ["Короткие уроки", "Short lessons"],
  "Test va olimpiadalar": ["Тесты и олимпиады", "Tests & olympiads"],
  Loyiha: ["Проект", "Project"],
  Maqsadimiz: ["Наша цель", "Our mission"],
  "Ko‘p so‘raladigan savollar": [
    "Частые вопросы",
    "Frequently asked questions",
  ],
  "Interaktiv namuna · Natijalar saqlanmaydi": [
    "Интерактивный прототип · Результаты не сохраняются",
    "Interactive preview · Results are not saved",
  ],
  "Yuqoriga qaytish ↑": ["Наверх ↑", "Back to top ↑"],
  "O‘ZBEK TILIDA FIKRLAYMIZ. BIRGA O‘SAMIZ.": [
    "МЫСЛИМ НА УЗБЕКСКОМ. РАСТЁМ ВМЕСТЕ.",
    "THINK IN UZBEK. GROW TOGETHER.",
  ],
  "Matematika.": ["Математика.", "Mathematics."],
  Yodlashdan: ["Больше, чем", "More than"],
  "kattaroq.": ["формулы.", "memorising."],
  "Bir masala, yangi qarash. Mantiq, tasavvur va kashfiyot orqali olimpiada sari o‘z yo‘lingizni toping.":
    [
      "Одна задача — новый взгляд. Найдите свой путь к олимпиадам через логику, воображение и открытия.",
      "One problem, a new perspective. Find your way to olympiads through logic, imagination and discovery.",
    ],
  "Masalalarni kashf etish": ["Открыть задачи", "Explore problems"],
  "Qayerdan boshlayman?": ["С чего начать?", "Where do I start?"],
  "Qiziquvchanlik — eng yaxshi boshlanish.": [
    "Любопытство — лучшее начало.",
    "Curiosity is the best beginning.",
  ],
  "MATEMATIKA — BU SAN’AT HAM.": [
    "МАТЕМАТИКА — ЭТО ЕЩЁ И ИСКУССТВО.",
    "MATHEMATICS IS AN ART, TOO.",
  ],
  "namunaviy masala": ["примеров задач", "sample problems"],
  "matematik yo‘nalish": ["направления математики", "math topics"],
  "qisqa, tushunarli dars": ["коротких урока", "short, clear lessons"],
  "Ochiq ko‘ring. Sinab ko‘ring.": [
    "Изучайте. Пробуйте.",
    "Take a look. Try it out.",
  ],
  "O‘Z YO‘LINGIZNI TANLANG": ["ВЫБЕРИТЕ СВОЙ ПУТЬ", "CHOOSE YOUR OWN PATH"],
  "Qiziqishingiz qayerdan boshlanadi?": [
    "С чего начинается ваш интерес?",
    "Where does your curiosity begin?",
  ],
  Algebra: ["Алгебра", "Algebra"],
  Geometriya: ["Геометрия", "Geometry"],
  "Sonlar nazariyasi": ["Теория чисел", "Number theory"],
  Kombinatorika: ["Комбинаторика", "Combinatorics"],
  "Ifodalar ichidagi qonuniyatni toping.": [
    "Найдите закономерности в выражениях.",
    "Find the patterns within expressions.",
  ],
  "Chizing. Kuzating. Isbotlang.": [
    "Чертите. Наблюдайте. Доказывайте.",
    "Draw. Observe. Prove.",
  ],
  "Oddiy sonlarning noodatiy xossalari.": [
    "Необычные свойства обычных чисел.",
    "Unexpected properties of everyday numbers.",
  ],
  "Imkoniyatlarni tartib bilan sanang.": [
    "Считайте возможности по порядку.",
    "Count possibilities, one step at a time.",
  ],
  "3 ta masala": ["3 задачи", "3 problems"],
  "KICHIK QADAM. YANGI G‘OYA.": [
    "МАЛЕНЬКИЙ ШАГ. НОВАЯ ИДЕЯ.",
    "A SMALL STEP. A NEW IDEA.",
  ],
  "Bugun nimani yechamiz?": [
    "Что решим сегодня?",
    "What shall we solve today?",
  ],
  "Barcha masalalar": ["Все задачи", "All problems"],
  "BILIMNI QADAMMA-QADAM QURING": [
    "СТРОЙТЕ ЗНАНИЯ ШАГ ЗА ШАГОМ",
    "BUILD YOUR KNOWLEDGE, STEP BY STEP",
  ],
  "Avval tushuning. Keyin yeching.": [
    "Сначала поймите. Затем решайте.",
    "Understand first. Then solve.",
  ],
  "Barcha darslar": ["Все уроки", "All lessons"],
  "QISQA DARS ·": ["КОРОТКИЙ УРОК ·", "SHORT LESSON ·"],
  DAQIQA: ["МИН", "MIN"],
  daqiqa: ["мин", "min"],
  "Darsni boshlash": ["Начать урок", "Start lesson"],
  "KEYINGI MANZIL — YANGI CHAQIRIQ": [
    "ВПЕРЕДИ — НОВЫЙ ВЫЗОВ",
    "NEXT STOP — A NEW CHALLENGE",
  ],
  "O‘zingizni sinashga tayyormisiz?": [
    "Готовы проверить себя?",
    "Ready to challenge yourself?",
  ],
  "Test va olimpiada formatlari bilan hozirdan tanishing.": [
    "Познакомьтесь с форматами тестов и олимпиад.",
    "Get a first look at our test and olympiad formats.",
  ],
  "Namunalarni ko‘rish": ["Посмотреть примеры", "View previews"],
  "FIKRINGIZ UCHUN MASHQ MAYDONI": [
    "ТРЕНИРОВКА ДЛЯ ВАШИХ ИДЕЙ",
    "A PRACTICE GROUND FOR YOUR MIND",
  ],
  "Har masala — yangi kashfiyot.": [
    "Каждая задача — новое открытие.",
    "Every problem, a new discovery.",
  ],
  "Qiziqqan yo‘nalishingizni tanlang. O‘z tezligingizda ishlang.": [
    "Выберите интересную тему. Занимайтесь в своём темпе.",
    "Choose a topic that interests you. Work at your own pace.",
  ],
  "Javobdan ham muhimi — unga qanday yetib borganingiz.": [
    "Важен не только ответ, но и путь к нему.",
    "How you reach the answer matters as much as the answer itself.",
  ],
  "BILIM YODLASHDAN EMAS, TUSHUNISHDAN BOSHLANADI": [
    "ЗНАНИЕ НАЧИНАЕТСЯ С ПОНИМАНИЯ",
    "KNOWLEDGE BEGINS WITH UNDERSTANDING",
  ],
  "Kichik darslar. Katta g‘oyalar.": [
    "Короткие уроки. Большие идеи.",
    "Small lessons. Big ideas.",
  ],
  "Bir tushuncha, bir misol, bir kichik mashq.": [
    "Одна идея, один пример, одно упражнение.",
    "One concept, one example, one small exercise.",
  ],
  "Murakkab masalalar uchun poydevorni birga quramiz.": [
    "Вместе заложим основу для сложных задач.",
    "Let’s build a foundation for challenging problems.",
  ],
  "KEYINGI BOSQICHNI TASAVVUR QILING": [
    "ПРЕДСТАВЬТЕ СЛЕДУЮЩИЙ ЭТАП",
    "IMAGINE YOUR NEXT STEP",
  ],
  "Yangi chaqiriqqa bir qadam.": [
    "На шаг ближе к новому вызову.",
    "One step towards a new challenge.",
  ],
  "Qisqa testdan chuqur isbotgacha — o‘zingizni sinashning turli yo‘llari.": [
    "От короткого теста до глубокого доказательства — разные способы проверить себя.",
    "From short tests to thoughtful proofs — different ways to challenge yourself.",
  ],
  "Hozircha formatlarni ko‘ring, masalalar bilan tayyorlaning.": [
    "Пока изучайте форматы и готовьтесь на задачах.",
    "Explore the formats and practise with problems for now.",
  ],
  "Boshlang‘ich": ["Начальный", "Beginner"],
  "O‘rta": ["Средний", "Intermediate"],
  Murakkab: ["Сложный", "Advanced"],
  "Yo‘nalishlar": ["Направления", "Topics"],
  "Barcha yo‘nalishlar": ["Все направления", "All topics"],
  "Qiyinlik darajasi": ["Сложность", "Difficulty"],
  "Barcha darajalar": ["Все уровни", "All levels"],
  "Javobga shoshilmang.": ["Не спешите с ответом.", "Take your time."],
  "Qiyin bo‘lsa, birinchi ishorani oching. Kichik kuzatuv ham katta qadam.": [
    "Если трудно, откройте первую подсказку. Даже небольшое наблюдение — шаг вперёд.",
    "If you get stuck, open the first hint. Even a small observation is a step forward.",
  ],
  "Standart tartib": ["По умолчанию", "Default order"],
  "Vaqt bo‘yicha": ["По времени", "By time"],
  "Osondan qiyinga": ["От простого к сложному", "Easiest first"],
  "ta masala topildi": ["— найдено задач", "problems found"],
  "Filtrlarni tozalash": ["Сбросить фильтры", "Clear filters"],
  "Namunaviy to‘plam": ["Пробная коллекция", "Sample collection"],
  "Hozircha mos masala yo‘q.": [
    "Подходящих задач пока нет.",
    "No matching problems yet.",
  ],
  "Boshqa so‘z yoki yo‘nalishni tanlab ko‘ring.": [
    "Попробуйте другое слово или направление.",
    "Try a different word or topic.",
  ],
  "Barcha masalalarni ko‘rish": ["Посмотреть все задачи", "View all problems"],
  "Masala qidirish": ["Поиск задачи", "Search problems"],
  "Masala nomi yoki raqami…": [
    "Название на узбекском или номер…",
    "Uzbek problem title or number…",
  ],
  "Qidiruvni tozalash": ["Очистить поиск", "Clear search"],
  "Masalalarni tartiblash": ["Сортировка задач", "Sort problems"],
  "Sahifa yo‘li": ["Навигационная цепочка", "Breadcrumb"],
  "MASALA /": ["ЗАДАЧА /", "PROBLEM /"],
  "Mustaqil mashq uchun namuna": [
    "Пример для самостоятельной практики",
    "Sample for independent practice",
  ],
  "MASALA SHARTI": ["УСЛОВИЕ ЗАДАЧИ", "PROBLEM STATEMENT"],
  "Javobingizni sinab ko‘ring": ["Проверьте свой ответ", "Try your answer"],
  "Son kiriting": ["Введите число", "Enter a number"],
  Tekshirish: ["Проверить", "Check answer"],
  "To‘g‘ri! Endi yechimdagi fikr yo‘lini ham taqqoslab ko‘ring.": [
    "Верно! Теперь сравните свой ход мысли с решением.",
    "Correct! Now compare your reasoning with the solution.",
  ],
  "Hali mos kelmadi. Shartni yana o‘qing yoki ishoradan foydalaning.": [
    "Пока не совпало. Перечитайте условие или откройте подсказку.",
    "Not quite yet. Read the statement again or try a hint.",
  ],
  "Javobni son ko‘rinishida kiriting.": [
    "Введите ответ числом.",
    "Please enter a number.",
  ],
  "Mahalliy namuna: javobingiz saqlanmaydi.": [
    "Локальный прототип: ответ не сохраняется.",
    "Local preview: your answer is not saved.",
  ],
  "Bu isbotlash masalasi. Fikrlaringizni qog‘ozga yozing, keyin namunaviy yechim bilan taqqoslang.":
    [
      "Это задача на доказательство. Запишите свои идеи, затем сравните их с примером решения.",
      "This is a proof problem. Write down your reasoning, then compare it with the sample solution.",
    ],
  "Bir oz yo‘l-yo‘riq kerakmi?": [
    "Нужна небольшая подсказка?",
    "Need a little guidance?",
  ],
  "-ishora": [" — подсказка", " — hint"],
  "Birinchi ishorani ochish": ["Открыть первую подсказку", "Show first hint"],
  "Keyingi ishorani ochish": ["Открыть следующую подсказку", "Show next hint"],
  "Ishoralarni yopish": ["Скрыть подсказки", "Hide hints"],
  "To‘liq yechim va tushuntirish": [
    "Полное решение и объяснение",
    "Full solution & explanation",
  ],
  "O‘zingiz bilan olib qoling": ["Главная мысль", "Take this with you"],
  "Kutubxonaga qaytish": ["Назад в библиотеку", "Back to library"],
  "Mavzuni o‘rganish": ["Изучить тему", "Explore this topic"],
  "Fikr daftari": ["Блокнот идей", "Idea notebook"],
  "G‘oyangizni shu yerda qayd eting.": [
    "Запишите свою идею здесь.",
    "Jot down your ideas here.",
  ],
  "Masala uchun qaydlar": ["Заметки к задаче", "Problem notes"],
  "Avval kichik holatlarni sinab ko‘rsam…": [
    "Сначала попробую небольшие примеры…",
    "What if I try a few small examples first…",
  ],
  "Qaydlar saqlanmaydi. Sahifani yangilasangiz, yo‘qoladi.": [
    "Заметки не сохраняются и исчезнут после обновления страницы.",
    "Notes are not saved. They disappear when you refresh.",
  ],
  "SHU MAVZUDA YANA": ["ЕЩЁ ПО ЭТОЙ ТЕМЕ", "MORE ON THIS TOPIC"],
  "Natijadan oldin — tushunish.": [
    "Сначала понимание, потом результат.",
    "Understanding comes first.",
  ],
  "Bir yechimni to‘liq tushunish o‘nta javobni bilishdan foydaliroq.": [
    "Понять одно решение полезнее, чем знать десять ответов.",
    "Understanding one solution is more useful than knowing ten answers.",
  ],
  "Bir daqiqalik masala": ["Задача на минуту", "One-minute challenge"],
  MANTIQ: ["ЛОГИКА", "LOGIC"],
  "Qonuniyatni topa olasizmi?": [
    "Найдёте закономерность?",
    "Can you spot the pattern?",
  ],
  "To‘g‘ri! Bular 1², 2², 3², 4², 5².": [
    "Верно! Это 1², 2², 3², 4², 5².",
    "Correct! They are 1², 2², 3², 4², 5².",
  ],
  "Har bir sonni kvadrat sifatida ko‘ring.": [
    "Посмотрите на каждое число как на квадрат.",
    "Think of each number as a square.",
  ],
  "MATEMATIKA HARAKATDA": ["МАТЕМАТИКА В ДВИЖЕНИИ", "MATHEMATICS IN MOTION"],
  "Formulani shunchaki": ["Не просто", "Don’t just"],
  "o‘qimang.": ["читайте.", "read it."],
  "Ko‘ring.": ["Смотрите.", "See it."],
  "Har bir yangi toq son kvadratga bitta rangli qatlam qo‘shadi. Sonni o‘zgartiring va qonuniyatni kashf eting.":
    [
      "Каждое новое нечётное число добавляет к квадрату цветной слой. Меняйте число и находите закономерность.",
      "Each new odd number adds a coloured layer to the square. Change the number and discover the pattern.",
    ],
  "Qatlamlar soni": ["Количество слоёв", "Number of layers"],
  "Shu g‘oyaga oid masala": ["Задача на эту идею", "A problem using this idea"],
  "TOQ SONLAR YIG‘INDISI": ["СУММА НЕЧЁТНЫХ ЧИСЕЛ", "SUM OF ODD NUMBERS"],
  "VIZUAL ISBOT": ["НАГЛЯДНОЕ ДОКАЗАТЕЛЬСТВО", "VISUAL PROOF"],
  "ta katak ·": ["клеток ·", "cells ·"],
  "ta qatlam": ["слоёв", "layers"],
  "To‘xtatish": ["Остановить", "Pause"],
  "Qatlamlarni jonlantirish": [
    "Показать слои по очереди",
    "Animate the layers",
  ],
  "TUSHUNGANINGIZNI SINANG": [
    "ПРОВЕРЬТЕ ПОНИМАНИЕ",
    "CHECK YOUR UNDERSTANDING",
  ],
  "Bitta javobni tanlang.": ["Выберите один ответ.", "Choose one answer."],
  "To‘g‘ri!": ["Верно!", "Correct!"],
  "Yana bir bor o‘ylab ko‘ring. Yuqoridagi misol yordam beradi.": [
    "Подумайте ещё раз. Пример выше поможет.",
    "Think it over once more. The example above may help.",
  ],
  "Ochiq dars": ["Открыт", "Open now"],
  "Darsni ochish": ["Открыть урок", "Open lesson"],
  "USHBU DARSDA": ["В ЭТОМ УРОКЕ", "IN THIS LESSON"],
  "Kichik mashq": ["Небольшое упражнение", "A small exercise"],
  "O‘qish + mashq": ["Изучение + практика", "Learning + practice"],
  "G‘oyani o‘zlashtirish uchun darsdan so‘ng unga oid masalani yeching.": [
    "Закрепите идею: после урока решите связанную задачу.",
    "Make the idea your own by solving a related problem after the lesson.",
  ],
  "ENDI NAVBAT SIZDA": ["ТЕПЕРЬ ВАША ОЧЕРЕДЬ", "NOW IT’S YOUR TURN"],
  "G‘oyani masalada sinab ko‘ring.": [
    "Примените идею в задаче.",
    "Try the idea in a problem.",
  ],
  "Masalani ochish": ["Открыть задачу", "Open problem"],
  "Bu bo‘lim — kelajakdagi formatlar namoyishi.": [
    "Этот раздел показывает будущие форматы.",
    "This section previews possible future formats.",
  ],
  "Quyidagi test va olimpiadalar haqiqiy tadbir emas. Ishtirok, taymer va baholash hali mavjud emas.":
    [
      "Это примеры, а не реальные мероприятия. Участие, таймер и оценивание пока недоступны.",
      "These tests and olympiads are examples, not live events. Entry, timers and scoring are not available yet.",
    ],
  NAMUNA: ["ПРИМЕР", "PREVIEW"],
  "· NAMUNA": ["· ПРИМЕР", "· PREVIEW"],
  Barchasi: ["Все", "All"],
  Test: ["Тест", "Test"],
  Olimpiada: ["Олимпиада", "Olympiad"],
  Testlar: ["Тесты", "Tests"],
  Olimpiadalar: ["Олимпиады", "Olympiads"],
  savol: ["вопросов", "questions"],
  masala: ["задач", "problems"],
  "Formatni ko‘rish": ["Посмотреть формат", "View format"],
  "REJALASHTIRILGAN MAVZULAR": ["ПЛАНИРУЕМЫЕ ТЕМЫ", "PLANNED TOPICS"],
  "Bu ro‘yxat format haqida tasavvur beradi; haqiqiy topshiriqlar keyinroq tayyorlanadi.":
    [
      "Список даёт представление о формате; задания будут подготовлены позже.",
      "This list gives a sense of the format; actual questions will be prepared later.",
    ],
  "Ishtirok etish — tez kunda": ["Участие — скоро", "Entry — coming soon"],
  "HOZIRDAN TAYYORLANING": [
    "НАЧНИТЕ ГОТОВИТЬСЯ СЕЙЧАС",
    "START PREPARING TODAY",
  ],
  "Katta chaqiriqlar": ["Большие вызовы", "Big challenges"],
  "kichik mashqlardan boshlanadi.": [
    "начинаются с маленьких упражнений.",
    "start with small exercises.",
  ],
  "Masalalar kutubxonasiga o‘tish": [
    "Перейти в библиотеку задач",
    "Go to the problem library",
  ],
  "Yo‘nalish tanlang": ["Выберите направление", "Choose a topic"],
  "Qiziqqan mavzuingizdagi masalani oching.": [
    "Откройте задачу на интересующую тему.",
    "Open a problem on a topic that interests you.",
  ],
  "Mustaqil urinib ko‘ring": [
    "Попробуйте самостоятельно",
    "Give it a try yourself",
  ],
  "Bir necha usulni sinang. Ishoraga shoshilmang.": [
    "Попробуйте несколько способов. Не спешите с подсказкой.",
    "Try a few approaches. Take your time before opening a hint.",
  ],
  "Yechimni tahlil qiling": ["Разберите решение", "Explore the solution"],
  "Yangi g‘oyani keyingi masalada qo‘llang.": [
    "Примените новую идею в следующей задаче.",
    "Use the new idea in your next problem.",
  ],
  "404 · BU YO‘L HALI CHIZILMAGAN": [
    "404 · ЭТОТ ПУТЬ ЕЩЁ НЕ НАЙДЕН",
    "404 · THIS PATH ISN’T MAPPED YET",
  ],
  "Sahifa topilmadi.": ["Страница не найдена.", "Page not found."],
  "Yangi masala bilan boshqa yo‘ldan boshlaymizmi?": [
    "Начнём с новой задачи?",
    "Shall we take a new path with a problem?",
  ],
  "Masalalarga o‘tish": ["Перейти к задачам", "Go to problems"],
  "MATH OLYMPIAD UZ HAQIDA": ["О MATH OLYMPIAD UZ", "ABOUT MATH OLYMPIAD UZ"],
  "Yaxshi savol": ["Хороший вопрос", "A good question"],
  "ko‘p narsani": ["меняет", "can change"],
  "o‘zgartiradi.": ["многое.", "everything."],
  "Biz matematikaning faqat javobini emas,": [
    "Мы хотим сделать интересным не только ответ,",
    "We want to make the thinking behind mathematics",
  ],
  "uning ortidagi fikrni ham qiziqarli qilmoqchimiz.": [
    "но и математическую мысль, которая за ним стоит.",
    "as interesting as the answer itself.",
  ],
  "“Nega?” degan savoldan": ["От вопроса «Почему?»", "From asking “Why?”"],
  "“Tushundim!” degan": ["до момента", "to that moment of"],
  "lahzagacha.": ["«Я понял!».", "“I understand!”"],
  "Biz yaratmoqchi bo‘lgan tajriba shu.": [
    "Именно такой опыт мы хотим создать.",
    "That is the experience we want to create.",
  ],
  "BIZNING MAQSAD": ["НАША ЦЕЛЬ", "OUR MISSION"],
  "Matematik fikrlashni": [
    "Развивать математическое мышление",
    "Build mathematical thinking",
  ],
  "o‘zbek tilida rivojlantirish.": [
    "на узбекском языке.",
    "in the Uzbek language.",
  ],
  "Math Olympiad Uz — masalalar yechish, qonuniyatlarni ko‘rish va fikrni isbotlashni o‘rganish uchun yaratilayotgan makon. Har bir o‘quvchi tushunarli izohdan boshlab, mustaqil yechimga yetib borishini istaymiz.":
    [
      "Math Olympiad Uz — пространство, где можно учиться решать задачи, замечать закономерности и доказывать свои идеи. Мы хотим, чтобы каждый ученик мог пройти путь от понятного объяснения к самостоятельному решению.",
      "Math Olympiad Uz is a place to learn problem solving, notice patterns and prove ideas. We want every learner to move from a clear explanation to an independent solution.",
    ],
  "UCHTA ASOSIY TAMOYIL": ["ТРИ ГЛАВНЫХ ПРИНЦИПА", "THREE GUIDING PRINCIPLES"],
  "Mazmunli o‘rganish qanday bo‘ladi?": [
    "Как выглядит осмысленное обучение?",
    "What makes learning meaningful?",
  ],
  "Ko‘rish orqali tushunish": [
    "Понимать через наглядность",
    "Understand through seeing",
  ],
  "Chizma, misol va kichik tajriba mavhum g‘oyani aniq tasavvurga aylantiradi.":
    [
      "Чертёж, пример и небольшой эксперимент превращают абстрактную идею в ясный образ.",
      "A diagram, an example and a small experiment turn abstract ideas into something clear.",
    ],
  "Mustaqil yo‘l topish": ["Находить свой путь", "Find your own way"],
  "Ishoralar javobni oshkor qilishga emas, keyingi qadamni topishga yordam beradi.":
    [
      "Подсказки помогают найти следующий шаг, не раскрывая ответ.",
      "Hints help you find the next step without giving away the answer.",
    ],
  "Fikrni asoslash": ["Обосновывать мысли", "Explain your reasoning"],
  "To‘g‘ri javob — boshlanish. Izchil, tushunarli isbot esa haqiqiy natija.": [
    "Правильный ответ — начало. Настоящий результат — последовательное и понятное доказательство.",
    "A correct answer is a beginning. A clear, logical proof is the real achievement.",
  ],
  "HOZIRGI BOSQICH": ["ТЕКУЩИЙ ЭТАП", "WHERE WE ARE NOW"],
  "Hali boshidamiz.": ["Мы только начинаем.", "We’re just getting started."],
  "Birga yaxshilaymiz.": [
    "Станем лучше вместе.",
    "Let’s make it better together.",
  ],
  "Bu to‘liq ishga tushgan platforma emas, interaktiv namuna. Hozir dizayn va asosiy o‘rganish yo‘lini sinayapmiz. Katta imkoniyatlardan avval, kichik tajribaning foydali bo‘lishini xohlaymiz.":
    [
      "Это интерактивный прототип, а не готовая платформа. Сейчас мы проверяем дизайн и основные способы обучения. Прежде чем добавлять большие возможности, хотим сделать полезным небольшой опыт.",
      "This is an interactive preview, not a fully launched platform. We’re testing the design and the core learning experience. Before adding more features, we want this small experience to be useful.",
    ],
  "Sinab ko‘rish": ["Попробовать", "Try it out"],
  "QISQA JAVOBLAR": ["КОРОТКИЕ ОТВЕТЫ", "QUICK ANSWERS"],
  "Qiziqtirgan savollaringiz.": [
    "Вопросы, которые вас интересуют.",
    "Questions on your mind.",
  ],
  "Kimlar uchun yaratilmoqda?": [
    "Для кого создаётся проект?",
    "Who is this for?",
  ],
  "Matematikaga qiziqqan o‘quvchilar, olimpiadaga ilk qadam qo‘yayotgan yoshlar va mustaqil mashq qilishni xohlaganlar uchun. Hozirgi to‘plam asosiy tushunchalardan boshlanadi.":
    [
      "Для школьников, увлечённых математикой, начинающих участников олимпиад и всех, кто хочет заниматься самостоятельно. Текущая коллекция начинается с основных понятий.",
      "For students curious about mathematics, newcomers to olympiads and anyone who wants to practise independently. The current collection starts with the basics.",
    ],
  "Hozir nimalarni sinab ko‘rish mumkin?": [
    "Что можно попробовать сейчас?",
    "What can I try now?",
  ],
  "12 ta namunaviy masala, ishoralar, to‘liq yechimlar, sonli javob tekshiruvi, 4 ta qisqa dars va interaktiv kvadrat tajribasi mavjud. Test va olimpiadalar esa faqat format namoyishi.":
    [
      "Доступны 12 примеров задач, подсказки, полные решения, проверка числовых ответов, 4 коротких урока и интерактивный эксперимент с квадратами. Тесты и олимпиады представлены только как примеры форматов.",
      "There are 12 sample problems, hints, full solutions, numeric answer checking, four short lessons and an interactive square experiment. Tests and olympiads are format previews only.",
    ],
  "Ro‘yxatdan o‘tish kerakmi?": [
    "Нужно ли регистрироваться?",
    "Do I need to sign up?",
  ],
  "Yo‘q. Hozirgi namunani akkauntsiz ko‘rishingiz mumkin. Javoblar, dars natijalari va qaydlar saqlanmaydi.":
    [
      "Нет. Прототип доступен без аккаунта. Ответы, результаты уроков и заметки не сохраняются.",
      "No. You can explore this preview without an account. Answers, lesson results and notes are not saved.",
    ],
  "Bu rasmiy olimpiada platformasimi?": [
    "Это официальная олимпиадная платформа?",
    "Is this an official olympiad platform?",
  ],
  "Yo‘q. Math Olympiad Uz mustaqil ta’lim loyihasi sifatida ishlab chiqilmoqda. Namunaviy masalalar rasmiy olimpiada savollari sifatida taqdim etilmaydi.":
    [
      "Нет. Math Olympiad Uz разрабатывается как независимый образовательный проект. Примеры задач не выдаются за официальные олимпиадные задания.",
      "No. Math Olympiad Uz is an independent educational project. Sample problems are not presented as official olympiad questions.",
    ],
  "Keyin qanday imkoniyatlar qo‘shiladi?": [
    "Какие возможности появятся дальше?",
    "What features come next?",
  ],
  "Avval ushbu namunaning dizayni, mazmuni va foydalanish qulayligini yaxshilaymiz. Keyingi imkoniyatlar shundan so‘ng alohida belgilanadi.":
    [
      "Сначала мы улучшим дизайн, содержание и удобство этого прототипа. Дальнейшие возможности будут определены отдельно.",
      "First, we will improve this preview’s design, content and ease of use. Future features will be decided separately.",
    ],
  "n =": ["n =", "n ="],
};
export function translate(value: string, language: Language) {
  if (language === "uz") return value;
  const key = value.trim().replace(/\s+/g, " ");
  const translated = (platformTranslations[key] || translations[key])?.[language === "ru" ? 0 : 1];
  if (translated === undefined) return value;
  return (
    value.slice(0, value.length - value.trimStart().length) +
    translated +
    value.slice(value.trimEnd().length)
  );
}
