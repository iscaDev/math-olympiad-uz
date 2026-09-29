"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import Icon from "./icons";
import { T } from "./preferences";

export default function PanelSignout() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      className="panel-signout"
      disabled={pending}
      onClick={() => startTransition(async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
      })}
    >
      <Icon name="logout" size={17} />
      <T>{pending ? "Chiqilmoqda…" : "Chiqish"}</T>
    </button>
  );
}
