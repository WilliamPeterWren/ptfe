import React, { useState, useEffect } from "react";

function CountDown() {
  const calculateTimeLeft = () => {
    const endTime = new Date("May 24, 2025 14:59:00 +07:00").getTime();
    const now = new Date().getTime();
    const difference = endTime - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  return (
    <div className="flex items-center justify-center bg-white py-2">
      <div className="flex items-center space-x-2 border border-gray-300 px-4 py-1 rounded">
        <span className="text-orange-500 font-bold text-lg">FLASH SALE</span>
        <span className="text-black font-semibold">⏳ KẾT THÚC TRONG</span>
        <span className="text-black font-bold">
          {timeLeft.hours !== undefined ? (
            <>
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
              {formatTime(timeLeft.seconds)}
            </>
          ) : (
            "00:00:00"
          )}
        </span>
      </div>
    </div>
  );
}

export default CountDown;
