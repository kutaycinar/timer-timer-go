import dayjs from "dayjs";

export const FREE_MAX_TIMERS = 3;

export type TimerType = {
  name: string;
  delta: number;
  total: number;
  counter: boolean;
  color: string;
  days: number[];
};

export type State = {
  state: {
    date: number;
    active: boolean;
    focus: number;
    timers: TimerType[];
    saves: Save[];
    promode: boolean;
  };
};

export type Save = {
  date: number;
  timers: TimerType[];
  completion: number;
};

export type themeOption = "dark" | "light";

export const initial: State = {
  state: {
    date: dayjs().valueOf(),
    active: false,
    focus: -1,
    timers: [],
    saves: [],
    promode: false,
  },
};
