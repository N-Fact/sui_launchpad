import { useEffect, useState } from "react";

const calculateTimeLeft = (data = "2023-11-13T21:32") => {
  var now = new Date;

  var eventStartTimeUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(),
    now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

  var eventEndTime = new Date(data);
  var difference = eventEndTime.valueOf() - eventStartTimeUTC.valueOf();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const useRemainingTime = (data = "2023-11-13T21:32") => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(data));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(data));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return timeLeft;
};

export default useRemainingTime;
