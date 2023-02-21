export type TimerType = {
  name: string;
  delta: number;
  total: number;
};

export type State = {
  state: {
    date: number;
    active: boolean;
    focus: number;
    timers: TimerType[];
  };
};

export const initial: State = {
  state: {
    date: new Date().getTime(),
    active: false,
    focus: -1,
    timers: [],
  },
};

export const getSeconds = (time: number) => {
  return time % 60;
};

export const getMinutes = (time: number) => {
  return Math.floor(time / 60) % 60;
};

export const getHours = (time: number) => {
  return Math.floor(time / 3600);
};

const pad = (time: number): string => {
  return String(time).padStart(2, "0");
};

export const parseTime = (time: number): string => {
  const hours = getHours(time);
  const minutes = getMinutes(time);
  const seconds = getSeconds(time);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export function isSameDay(timestamp: number) {
  const date1 = new Date(timestamp);
  const date2 = new Date();
  return date1.toDateString() == date2.toDateString();
}
