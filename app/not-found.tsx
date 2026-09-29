import { T } from "@/components/preferences";
import Link from "next/link";
import Icon from "@/components/icons";
export default function NotFound() {
  return (
    <div className="shell empty-state">
      <Icon name="compass" size={56} />
      <p className="eyebrow">
        <T>{"404 · BU YO‘L HALI CHIZILMAGAN"}</T>
      </p>
      <h1>
        <T>{"Sahifa topilmadi."}</T>
      </h1>
      <p>
        <T>{"Yangi masala bilan boshqa yo‘ldan boshlaymizmi?"}</T>
      </p>
      <Link className="button primary" href="/problems">
        <T>{"Masalalarga o‘tish"}</T>
      </Link>
    </div>
  );
}
