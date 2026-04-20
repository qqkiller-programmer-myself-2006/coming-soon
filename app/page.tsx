"use client";
import { useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import EmailForm from "@/components/EmailForm";
import config from "@/config.json";

export default function Home() {
  const [lang, setLang] = useState<"th" | "en">("th");
  const { site, countdown } = config;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
            left: `${10 + i * 15}%`,
            background: "#a78bfa",
            animationDuration: `${8 + i * 3}s`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      {/* Lang toggle */}
      <button
        onClick={() => setLang(l => l === "th" ? "en" : "th")}
        className="fixed top-4 right-4 glass px-3 py-1.5 rounded-full text-xs text-slate-300 hover:text-white transition-all"
      >
        {lang === "th" ? "🇺🇸 EN" : "🇹🇭 TH"}
      </button>

      <div className="w-full max-w-md flex flex-col items-center gap-8 text-center">
        {/* Badge */}
        <div className="glass px-4 py-1.5 rounded-full text-xs text-violet-300 fade-up delay-1">
          ✨ {lang === "th" ? "กำลังสร้างบางสิ่งสวยงาม" : "Building something beautiful"}
        </div>

        {/* Title */}
        <div className="fade-up delay-2">
          <h1
            className="text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "'Prompt', sans-serif" }}
          >
            {lang === "th" ? site.titleTh : site.titleEn}
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            {lang === "th" ? site.subtitleTh : site.subtitleEn}
          </p>
        </div>

        {/* Countdown */}
        <CountdownTimer targetDate={countdown.targetDate} lang={lang} />

        {/* Divider */}
        <div className="w-full flex items-center gap-3 fade-up delay-4">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-xs text-slate-600">
            {lang === "th" ? "รับแจ้งเตือนก่อนใคร" : "Get early access"}
          </span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Email Form */}
        <EmailForm lang={lang} />

        {/* Footer */}
        <p className="text-xs text-slate-700 fade-up delay-5">
          © 2025 IQ — ธีรภัทร เตโช
        </p>
      </div>
    </main>
  );
}
