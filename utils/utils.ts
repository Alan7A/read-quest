import { Session } from "types/Session";

export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatNumber = (num: number): string => num.toString().padStart(2, "0");

  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
    seconds
  )}`;
}

export const getTotalReadingTime = (sessions: Session[] | undefined) => {
  if (!sessions) return "00:00:00";
  const totalSeconds = sessions.reduce((acc, session) => {
    return acc + session.duration;
  }, 0);
  return formatTime(totalSeconds);
};
