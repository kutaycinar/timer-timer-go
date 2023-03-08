import dayjs from "dayjs";

export type TimerType = {
  name: string;
  delta: number;
  total: number;
  counter: boolean;
};

export type State = {
  state: {
    date: number;
    active: boolean;
    focus: number;
    timers: TimerType[];
    saves: Save[];
  };
};

export type Save = {
  date: number;
  timers: TimerType[];
  completion: number;
};

export const initial: State = {
  state: {
    date: dayjs().valueOf(),
    active: false,
    focus: -1,
    timers: [],
    saves: [],
  },
};
