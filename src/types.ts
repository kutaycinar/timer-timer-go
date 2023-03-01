import dayjs from "dayjs";

export type TimerType = {
  name: string;
  delta: number;
  total: number;
  counter: boolean;
  color: string;
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

const emptyList: Save[] = [];
for (let index = 1; index < 9; index++) {
  const empty: Save = {
    date: new Date(
      new Date().getTime() - index * (24 * 60 * 60 * 1000)
    ).getTime(),
    timers: [],
    completion: 0,
  };
  emptyList.push(empty);
}
emptyList.reverse();

export const initial: State = {
  state: {
    date: dayjs().valueOf(),
    active: false,
    focus: -1,
    timers: [],
    saves: emptyList,
  },
};
