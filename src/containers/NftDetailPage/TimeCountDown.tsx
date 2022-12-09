import useCountDownTime from "hooks/useCountDownTime";

const TimeCountDown = (eventDate: any) => {
  const timeLeft = useCountDownTime(eventDate.eventDate);

  return (
    <div className="space-y-5">
      <div className="flex space-x-1 ">
        <div className="flex flex-col ">
          <span className="text-sm font-semibold">
            {timeLeft.days}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Days
          </span>
        </div>
        <div className="flex flex-col ">
          <span className="text-sm font-semibold">
            {timeLeft.hours}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            hours
          </span>
        </div>
        <div className="flex flex-col ">
          <span className="text-sm font-semibold">
            {timeLeft.minutes}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            min
          </span>
        </div>
        <div className="flex flex-col ">
          <span className="text-sm font-semibold">
            {timeLeft.seconds}
          </span>
          <span className="text-xs  text-neutral-500 dark:text-neutral-400">sec</span>
        </div>
      </div>
    </div>
  );
};

export default TimeCountDown;
