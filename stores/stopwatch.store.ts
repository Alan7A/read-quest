import { create } from "zustand";

interface FormattedTime {
  hours: string;
  minutes: string;
  seconds: string;
}

interface CronometroState {
  timeInSeconds: number;
  isActive: boolean;
  interval: NodeJS.Timeout | null;
  playPause: () => void;
  restart: () => void;
  formatTime: (tiempo: number) => FormattedTime;
}

export const useStopwatchStore = create<CronometroState>((set, get) => ({
  timeInSeconds: 0,
  isActive: false,
  interval: null,
  playPause: () => {
    const state = get();
    if (state.isActive) {
      // Pausar
      if (state.interval) clearInterval(state.interval);
      set({ isActive: false, interval: null });
    } else {
      // Iniciar
      const newInterval = setInterval(() => {
        set((state) => ({ timeInSeconds: state.timeInSeconds + 1 }));
      }, 1000);
      set({ isActive: true, interval: newInterval });
    }
  },
  restart: () => {
    const { interval } = get();
    if (interval) clearInterval(interval);
    set({ timeInSeconds: 0, isActive: false, interval: null });
  },
  formatTime: (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  },
}));
