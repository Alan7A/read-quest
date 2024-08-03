// CronometroService.tsx
import type React from "react";
import { useEffect } from "react";
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
