"use client";
import { useState } from "react";
import config from "@/config.json";

export default function EmailForm({ lang }: { lang: "th" | "en" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");
  const c = config.email;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMsg(lang === "th" ? c.successTh : c.successEn);
        setEmail("");
      } else {
        throw new Error(data.message);
      }
    } catch {
      setStatus("error");
      setMsg(lang === "th" ? "เกิดข้อผิดพลาด กรุณาลองใหม่" : "Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="glass rounded-2xl p-5 text-center fade-up">
        <span className="text-3xl">🎉</span>
        <p className="text-slate-200 mt-2 font-medium">{msg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 fade-up delay-4 w-full max-w-sm">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={lang === "th" ? c.placeholderTh : c.placeholderEn}
          required
          className="flex-1 glass rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-400 border border-transparent transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#7c3aed,#6366f1)", fontFamily: "'Prompt',sans-serif" }}
        >
          {status === "loading" ? "..." : lang === "th" ? c.buttonTh : c.buttonEn}
        </button>
      </div>
      {status === "error" && <p className="text-red-400 text-xs text-center">{msg}</p>}
    </form>
  );
}
