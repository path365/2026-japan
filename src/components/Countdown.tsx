"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex justify-center gap-4 text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[80px]">
          <div className="text-4xl font-bold">--</div>
          <div className="text-sm opacity-80">天</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 md:gap-4 text-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[80px]">
        <div className="text-3xl md:text-4xl font-bold">{timeLeft.days}</div>
        <div className="text-sm opacity-80">天</div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[80px]">
        <div className="text-3xl md:text-4xl font-bold">{timeLeft.hours}</div>
        <div className="text-sm opacity-80">時</div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[80px]">
        <div className="text-3xl md:text-4xl font-bold">{timeLeft.minutes}</div>
        <div className="text-sm opacity-80">分</div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[80px]">
        <div className="text-3xl md:text-4xl font-bold">{timeLeft.seconds}</div>
        <div className="text-sm opacity-80">秒</div>
      </div>
    </div>
  );
}
