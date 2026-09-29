import { T } from "@/components/preferences";
import Link from "next/link";
import Icon from "@/components/icons";
import { SectionHead } from "@/components/ui";
export const metadata = { title: "Loyiha haqida" };
const faqs = [
  [
    "Kimlar uchun yaratilmoqda?",
    "Matematikaga qiziqqan o‘quvchilar, olimpiadaga ilk qadam qo‘yayotgan yoshlar va mustaqil mashq qilishni xohlaganlar uchun. Hozirgi to‘plam asosiy tushunchalardan boshlanadi.",
  ],
  [
    "Hozir nimalarni sinab ko‘rish mumkin?",
    "Masalalar, vaqtli mashq testlari, mavzular, maqolalar va kitoblarni o‘rganing. Hisobingizda shaxsiy qaydlar va test natijalari saqlanadi.",
  ],
  [
    "Ro‘yxatdan o‘tish kerakmi?",
    "Kataloglar hammaga ochiq. Masala, test yoki o‘quv resursining to‘liq mazmuni uchun hisobga kiring.",
  ],
  [
    "Bu rasmiy olimpiada platformasimi?",
    "Yo‘q. Math Olympiad Uz mustaqil ta’lim loyihasi sifatida ishlab chiqilmoqda. Namunaviy masalalar rasmiy olimpiada savollari sifatida taqdim etilmaydi.",
  ],
  [
    "Keyin qanday imkoniyatlar qo‘shiladi?",
    "Avval ushbu namunaning dizayni, mazmuni va foydalanish qulayligini yaxshilaymiz. Keyingi imkoniyatlar shundan so‘ng alohida belgilanadi.",
  ],
];
export default function About() {
  return (
    <div className="shell">
      <section className="about-hero">
        <div>
          <p className="eyebrow">
            <span /> <T>{"MATH OLYMPIAD UZ HAQIDA"}</T>
          </p>
          <h1>
            <T>{"Yaxshi savol"}</T>
            <br />
            <span className="violet-text">
              <T>{"ko‘p narsani"}</T>
            </span>
            <br />
            <T>{"o‘zgartiradi."}</T>
          </h1>
          <p>
            <T>{"Biz matematikaning faqat javobini emas,"}</T>
            <br />
            <T>{"uning ortidagi fikrni ham qiziqarli qilmoqchimiz."}</T>
          </p>
        </div>
        <div className="about-note">
          <Icon name="sparkle" size={46} weight="duotone" />
          <p>
            <T>{"“Nega?” degan savoldan"}</T>
            <br />
            <T>{"“Tushundim!” degan"}</T>
            <br />
            <T>{"lahzagacha."}</T>
          </p>
          <span>
            <T>{"Biz yaratmoqchi bo‘lgan tajriba shu."}</T>
          </span>
        </div>
      </section>
      <section className="about-mission">
        <p className="eyebrow">
          <T>{"BIZNING MAQSAD"}</T>
        </p>
        <h2>
          <T>{"Matematik fikrlashni"}</T>
          <br />
          <T>{"o‘zbek tilida rivojlantirish."}</T>
        </h2>
        <p>
          <T>
            {
              "Math Olympiad Uz — masalalar yechish, qonuniyatlarni ko‘rish va fikrni isbotlashni o‘rganish uchun yaratilayotgan makon. Har bir o‘quvchi tushunarli izohdan boshlab, mustaqil yechimga yetib borishini istaymiz."
            }
          </T>
        </p>
      </section>
      <section className="section">
        <SectionHead
          kicker="UCHTA ASOSIY TAMOYIL"
          title="Mazmunli o‘rganish qanday bo‘ladi?"
        />
        <div className="principles">
          {[
            {
              icon: "eye" as const,
              title: "Ko‘rish orqali tushunish",
              text: "Chizma, misol va kichik tajriba mavhum g‘oyani aniq tasavvurga aylantiradi.",
              color: "blue",
            },
            {
              icon: "compass" as const,
              title: "Mustaqil yo‘l topish",
              text: "Ishoralar javobni oshkor qilishga emas, keyingi qadamni topishga yordam beradi.",
              color: "violet",
            },
            {
              icon: "pencil" as const,
              title: "Fikrni asoslash",
              text: "To‘g‘ri javob — boshlanish. Izchil, tushunarli isbot esa haqiqiy natija.",
              color: "coral",
            },
          ].map((p) => (
            <article key={p.title} className={p.color}>
              <Icon name={p.icon} size={38} weight="duotone" />
              <h3>
                <T>{p.title}</T>
              </h3>
              <p>
                <T>{p.text}</T>
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-status">
        <span className="preview-badge">
          <T>{"HOZIRGI BOSQICH"}</T>
        </span>
        <div>
          <h2>
            <T>{"Hali boshidamiz."}</T>
            <br />
            <T>{"Birga yaxshilaymiz."}</T>
          </h2>
          <p>
            <T>
              {
                "Platforma ishlab chiqilmoqda. Hozir o‘rganish, mashq qilish va kontent yaratish imkoniyatlarini sinayapmiz. Testlar mustaqil tayyorgarlik uchun; rasmiy olimpiada nazorati hali qo‘shilmagan."
              }
            </T>
          </p>
        </div>
        <Link href="/problems" className="button primary">
          <T>{"Sinab ko‘rish "}</T>
          <Icon name="arrow" size={18} />
        </Link>
      </section>
      <section id="questions" className="faq section">
        <SectionHead
          kicker="QISQA JAVOBLAR"
          title="Qiziqtirgan savollaringiz."
        />
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              <T>{q}</T>
              <Icon name="down" size={20} />
            </summary>
            <p>
              <T>{a}</T>
            </p>
          </details>
        ))}
      </section>
    </div>
  );
}
