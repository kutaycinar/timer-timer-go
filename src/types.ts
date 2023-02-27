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
    saves: {};
  };
};

export const initial: State = {
  state: {
    date: new Date().getTime(),
    active: false,
    focus: -1,
    timers: [],
    saves: {},
  },
};
