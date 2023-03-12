import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { Channel, LocalNotifications } from "@capacitor/local-notifications";
import { Preferences } from "@capacitor/preferences";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { OverviewProps } from "./components/Overview";
import { initial, Save, State, TimerType } from "./types";
import { Dayjs } from "dayjs";

export function useTimer() {
  const [state, setState] = useState<State>(initial);
  const [isLoaded, setLoaded] = useState(false);
  const [active, setActive] = useState(true);

  // ask for notification permission
  if (Capacitor.isNativePlatform()) {
    LocalNotifications.requestPermissions();

    const channel: Channel = {
      id: "main",
      name: "Task Finished",
      description: "Triggers when a timer completes in the app.",
      sound: "harp.mp3",
      importance: 4,
      visibility: 1,
      lights: true,
      vibration: true,
    };
    LocalNotifications.createChannel(channel);
  }

  App.addListener("appStateChange", ({ isActive }) => {
    if (active != isActive) {
      setActive(isActive);
    }
  });

  // initial load
  useEffect(() => {
    if (!active) return;
    Preferences.get({ key: "state" }).then((res) => {
      if (res.value) {
        setState(JSON.parse(res.value));
        setLoaded(true);
      }
    });
  }, [active]);

  // runs once after loading state
  useEffect(() => {
    if (!isLoaded) return;

    // daily reset check
    const lastDate = dayjs(state.state.date);
    const now = dayjs();
    if (!now.isSame(lastDate, "day")) {
      saveAllTimers(lastDate);
      resetAllTimers();
    }
    //TODO: Handle case where it's the same day
    // increment check if not daily reset not happened
    else if (state.state.active) {
      fastForwardTimer();
    }
    setLoaded(false);
  }, [isLoaded, state]);

  function fastForwardTimer() {
    const prevDate = dayjs(state.state.date).startOf("second");
    const date2 = dayjs().startOf("second");
    const seconds = date2.diff(prevDate, "seconds");

    const newTimers = [...state.state.timers];
    newTimers[state.state.focus].delta = Math.max(
      0,
      newTimers[state.state.focus].delta - seconds
    );
    setState((prevState) => {
      return {
        state: {
          ...prevState.state,
          timers: newTimers,
          date: dayjs().startOf("second").valueOf(),
        },
      };
    });
  }

  // interval
  useEffect(() => {
    const interval = setInterval(async () => {
      await Preferences.set({
        key: "state",
        value: JSON.stringify(state),
      });

      // daily reset check
      const prevDate = dayjs(state.state.date);

      if (!dayjs().isSame(prevDate, "day")) {
        saveAllTimers(prevDate);
        resetAllTimers();
        return;
      }

      // check for timer active
      if (state.state.active) {
        const newTimers = [...state.state.timers];
        const delta = newTimers[state.state.focus].delta;
        // timer can be decremented, do that
        if (delta > 0) {
          fastForwardTimer();
        }
        // timer already at 0, set active to false
        else {
          setState((prevState) => {
            return {
              state: {
                ...prevState.state,
                date: dayjs().valueOf(),
                active: false,
              },
            };
          });
        }
      }
      // no decrement -- update date in state
      else {
        setState((prevState) => {
          return {
            state: {
              ...prevState.state,
              date: dayjs().valueOf(),
            },
          };
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  // addition
  function addTimer(props: TimerType) {
    setState((prevState) => {
      return {
        state: {
          ...prevState.state,
          timers: [...prevState.state.timers, props],
        },
      };
    });
  }

  // edit
  function editTimer(props: TimerType) {
    const newTimers = [...state.state.timers];
    newTimers[state.state.focus] = props;
    setState((prevState) => {
      return {
        state: {
          ...prevState.state,
          timers: newTimers,
        },
      };
    });
  }

  // removal
  function deleteTimer(name: string) {
    setState((prevState) => {
      return {
        state: {
          ...prevState.state,
          active: false,
          focus: -1,
          timers: prevState.state.timers.filter((t) => t.name !== name),
        },
      };
    });
  }

  // focus
  function focusTimer(idx: number) {
    setState((prevState) => {
      return {
        state: {
          ...prevState.state,
          focus: idx,
        },
      };
    });
  }

  async function sendNotification() {
    const now = dayjs();
    const future = now.add(
      state.state.timers[state.state.focus].delta,
      "seconds"
    );

    if (now.diff(future, "days") > 1) return;

    await LocalNotifications.schedule({
      notifications: [
        {
          title: state.state.timers[state.state.focus].name + " Finished!",
          body: "Congratulations, you have completed your task.",
          smallIcon: "icon",
          id: 1,
          schedule: {
            at: future.toDate(),
            allowWhileIdle: true,
          },
          sound: "harp3.mp3",
          channelId: "main",
        },
      ],
    });
  }

  async function cancelNotification() {
    await LocalNotifications.cancel({
      notifications: [{ id: 1 }],
    });
  }

  function countNext() {
    const newTimers = [...state.state.timers];
    newTimers[state.state.focus].delta -= 1;
    newTimers[state.state.focus].delta = Math.max(
      0,
      newTimers[state.state.focus].delta
    );
    setState((prevState) => {
      return {
        state: {
          ...prevState.state,
          timers: newTimers,
        },
      };
    });
  }

  // start
  function signalStart() {
    sendNotification();
    setState((prevState) => {
      return {
        state: {
          ...prevState.state,
          active: true,
        },
      };
    });
  }

  // pause
  function signalPause() {
    cancelNotification();
    setState((prevState) => {
      return {
        state: {
          ...prevState.state,
          active: false,
        },
      };
    });
  }

  function clearAllData() {
    setState(initial);
  }

  // stop
  function signalStop() {
    cancelNotification();
    setState((prevState) => {
      return {
        state: {
          ...prevState.state,
          active: false,
          focus: -1,
        },
      };
    });
  }

  // reset
  function signalReset() {
    signalPause();
    cancelNotification();
    const newTimers = [...state.state.timers];
    newTimers[state.state.focus].delta = newTimers[state.state.focus].total;
    setState((prevState) => {
      return {
        state: {
          ...prevState.state,
          timers: newTimers,
        },
      };
    });
  }

  function saveAllTimers(date: Dayjs) {
    console.log("Saving for time: " + date.format("DD:MM:YYYY"));
    const overall = getOverall(date);
    // Push timer for last day with data
    const newSave = {
      timers: state.state.timers,
      completion: Math.round((overall.delta / overall.total) * 100),
      date: date.valueOf(),
    };
    // Add saves to state
    setState((prevState: State) => {
      return {
        state: {
          ...prevState.state,
          saves: [...(prevState.state.saves || []), newSave],
          date: dayjs().valueOf(),
        },
      };
    });
  }

  function clearSaves() {
    setState((prevState: State) => {
      return {
        state: {
          ...prevState.state,
          saves: [],
        },
      };
    });
  }

  // reset all
  function resetAllTimers() {
    cancelNotification();
    const newTimers = state.state.timers.map((t) => {
      return {
        ...t,
        delta: t.total,
      };
    });
    setState((prevState) => {
      return {
        state: {
          ...prevState.state,
          timers: newTimers,
        },
      };
    });
  }

  // accumulated timer data
  function getOverall(date: Dayjs): OverviewProps {
    const reducer = (accumulator: TimerType, currentValue: TimerType) => ({
      name: "",
      delta:
        Number(accumulator.delta) +
        Number(currentValue.delta) / Number(currentValue.total),
      total: Number(accumulator.total) + 1,
      counter: false,
      reverse: false,
      color: "",
      days: [],
    });
    const todayTimers = state.state.timers.filter((t: TimerType) =>
      t.days.includes(date.day())
    );
    const { delta, total } = todayTimers.reduce(reducer, {
      name: "",
      delta: 0,
      total: 0,
      counter: false,
      reverse: false,
      color: "",
      days: [],
    });

    return {
      delta: (total - delta) / todayTimers.length || 0,
      total: total / todayTimers.length || 0,
    };
  }

  return {
    state,
    setState,
    addTimer,
    deleteTimer,
    focusTimer,
    signalStart,
    signalPause,
    signalStop,
    signalReset,
    resetAllTimers,
    getOverall,
    countNext,
    editTimer,
    saveAllTimers,
    clearSaves,
    clearAllData,
  };
}
