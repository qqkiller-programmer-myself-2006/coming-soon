"use client";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  targetDate: string;
  lang: "th" | "en";
}

const labels = {
  th: ["วัน", "ชั่วโมง", "นาที", "วินาที"],
  en: ["Days", "Hours", "Minutes", "Seconds"],
};

function calc(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function CountdownTimer({ targetDate, lang }: Props) {
  const [time, setTime] = useState<TimeLeft>(calc(targetDate));

  useEffect(() => {
    const t = setInterval(() => setTime(calc(targetDate)), 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  const units = [time.days, time.hours, time.minutes, time.seconds];

  return (
    <div className="flex gap-3 justify-center fade-up delay-3">
      {units.map((val, i) => (
        <div key={i} className="countdown-box">
          <span
            className="text-3xl font-bold tabular-nums"
            style={{ fontFamily: "'Prompt', sans-serif", color: "#a78bfa" }}
          >
            {String(val).padStart(2, "0")}
          </span>
          <span className="text-xs text-slate-400 mt-1">{labels[lang][i]}</span>
        </div>
      ))}
    </div>
  );
}
