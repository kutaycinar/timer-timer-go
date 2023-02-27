export type TimerType = {
  name: string;
  delta: number;
  total: number;
  counter: boolean;
  reverse: boolean;
};

export type State = {
  state: {
    date: number;
    active: boolean;
    focus: number;
    timers: TimerType[];
    saves: Map<string, object>;
  };
};

export const initial: State = {
  state: {
    date: new Date().getTime(),
    active: false,
    focus: -1,
    timers: [],
    saves: new Map<string, object>(),
  },
};
