import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Preferences } from "@capacitor/preferences";
import { useEffect, useState } from "react";
import { OverviewProps } from "./components/Overview";
import { initial, State, TimerType } from "./types";
import { isSameDay } from "./utils";

export function useTimer() {
  const [state, setState] = useState<State>(initial);
  const [isLoaded, setLoaded] = useState(false);

  // ask for notification permission
  if (Capacitor.isNativePlatform()) {
    LocalNotifications.requestPermissions();
  }

  // initial load
  useEffect(() => {
    Preferences.get({ key: "state" }).then((res) => {
      if (res.value) {
        setState(JSON.parse(res.value));
        setLoaded(true);
      }
    });
  }, []);

  // runs once after loading state
  useEffect(() => {
    if (!isLoaded) return;

    // daily reset check
    if (!isSameDay(state.state.date, new Date().getTime())) {
      resetAllTimers();
    }

    // increment check if not daily reset not happened
    else if (state.state.active) {
      const date1 = state.state.date;
      const date2 = new Date().getTime();
      const seconds = Math.floor((date2 - date1) / 1000);
      const newTimers = [...state.state.timers];
      newTimers[state.state.focus].delta = Math.max(
        0,
        newTimers[state.state.focus].delta - seconds
      );
      setState((prevState) => {
        return {
          state: {
            date: prevState.state.date,
            active: prevState.state.active,
            focus: prevState.state.focus,
            timers: newTimers,
          },
        };
      });
    }
    setLoaded(false);
  }, [isLoaded, state]);

  // interval
  useEffect(() => {
    const interval = setInterval(async () => {
      await Preferences.set({
        key: "state",
        value: JSON.stringify(state),
      });
      // check for timer active
      if (state.state.active) {
        const newTimers = [...state.state.timers];
        const delta = newTimers[state.state.focus].delta;
        // timer can be decremented, do that
        if (delta > 0) {
          newTimers[state.state.focus].delta -= 1;
          setState((prevState) => {
            return {
              state: {
                date: new Date().getTime(),
                active: prevState.state.active,
                focus: prevState.state.focus,
                timers: newTimers,
              },
            };
          });
        }
        // timer already at 0, set active to false
        else {
          setState((prevState) => {
            return {
              state: {
                date: new Date().getTime(),
                active: false,
                focus: prevState.state.focus,
                timers: prevState.state.timers,
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
              date: new Date().getTime(),
              active: prevState.state.active,
              focus: prevState.state.focus,
              timers: prevState.state.timers,
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
          date: prevState.state.date,
          active: prevState.state.active,
          focus: prevState.state.focus,
          timers: [...prevState.state.timers, props],
        },
      };
    });
  }

  // edit
  function editTimer(props: TimerType) {
    console.log(props);
    const newTimers = [...state.state.timers];
    newTimers[state.state.focus] = props;
    setState((prevState) => {
      return {
        state: {
          date: prevState.state.date,
          active: prevState.state.active,
          focus: prevState.state.focus,
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
          date: prevState.state.date,
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
          date: prevState.state.date,
          active: prevState.state.active,
          focus: idx,
          timers: prevState.state.timers,
        },
      };
    });
  }

  async function sendNotification() {
    const now = new Date().getTime();
    const future = new Date(
      now + state.state.timers[state.state.focus].delta * 1000
    ).getTime();

    if (!isSameDay(now, future)) return;

    await LocalNotifications.schedule({
      notifications: [
        {
          title: state.state.timers[state.state.focus].name + " Finished!",
          body: String(state.state.timers[state.state.focus].total),
          id: 1,
          schedule: {
            at: new Date(
              Date.now() + state.state.timers[state.state.focus].delta * 1000
            ),
          },
          sound: undefined,
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
          date: prevState.state.date,
          active: prevState.state.active,
          focus: prevState.state.focus,
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
          date: prevState.state.date,
          active: true,
          focus: prevState.state.focus,
          timers: prevState.state.timers,
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
          date: prevState.state.date,
          active: false,
          focus: prevState.state.focus,
          timers: prevState.state.timers,
        },
      };
    });
  }

  // stop
  function signalStop() {
    cancelNotification();
    setState((prevState) => {
      return {
        state: {
          date: prevState.state.date,
          active: false,
          focus: -1,
          timers: prevState.state.timers,
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
          date: prevState.state.date,
          active: prevState.state.active,
          focus: prevState.state.focus,
          timers: newTimers,
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
          date: prevState.state.date,
          active: prevState.state.active,
          focus: prevState.state.focus,
          timers: newTimers,
        },
      };
    });
  }

  // accumulated timer data
  function getOverall(): OverviewProps {
    const reducer = (accumulator: TimerType, currentValue: TimerType) => ({
      name: "",
      delta:
        Number(accumulator.delta) +
        Number(currentValue.delta) / Number(currentValue.total),
      total: Number(accumulator.total) + 1,
      counter: false,
      reverse: false,
    });

    const { delta, total } = state.state.timers.reduce(reducer, {
      name: "",
      delta: 0,
      total: 0,
      counter: false,
      reverse: false,
    });

    return {
      delta: (total - delta) / state.state.timers.length,
      total: total / state.state.timers.length,
    };
  }

  return {
    state,
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
  };
}
