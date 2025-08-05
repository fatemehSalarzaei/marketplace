"use client";

import { useEffect, useState } from "react";
import { Element } from "@/types/pageBuilder/pageBuilder";

function getTimeLeft(targetDate: string) {
  const total = Date.parse(targetDate) - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

export default function Countdown({ element }: { element: Element }) {
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft(element.extra_data?.end_date || "")
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(element.extra_data?.end_date || ""));
    }, 1000);
    return () => clearInterval(timer);
  }, [element.extra_data?.end_date]);

  return (
    <div className="my-10 text-center">
      <h3 className="text-xl font-bold mb-4">{element.display_title}</h3>
      <div className="flex justify-center gap-4 text-lg font-bold">
        <div>{timeLeft.days} روز</div>
        <div>{timeLeft.hours} ساعت</div>
        <div>{timeLeft.minutes} دقیقه</div>
        <div>{timeLeft.seconds} ثانیه</div>
      </div>
    </div>
  );
}
