// CronometroService.tsx
import React, { useEffect } from "react";
import { useStopwatchStore } from "stores/stopwatch.store";

const StopwatchService: React.FC = () => {
  const { interval } = useStopwatchStore();

  useEffect(() => {
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [interval]);

  return null;
};

export default StopwatchService;
