"use client";

import React, { useEffect, useState } from "react";

export function WelcomeSection() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);
  return (
    <div
      suppressHydrationWarning
      className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-slate-300">
            Heres whats happening with your movie platform today.
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {time.toLocaleDateString()}
          </div>
          <div className="text-slate-400">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
