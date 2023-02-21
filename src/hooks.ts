import { Preferences } from "@capacitor/preferences";
import { useEffect, useState } from "react";
import { initial, isSameDay, State, TimerType } from "./types";

export function useTimer() {
  const [state, setState] = useState<State>(initial);
  const [isLoaded, setLoaded] = useState(false);

  // initial load
  useEffect(() => {
    Preferences.get({ key: "state" }).then((res) => {
      if (res.value) {
        setState(JSON.parse(res.value));
        setLoaded(true);
      }
    });
  }, []);

  // compare the date when state is updated (only once)
  useEffect(() => {
    if (!isLoaded) return;
    // daily reset check at load
    if (!isSameDay) {
      resetAllTimers();
    }
    // increment check if not daily reset
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
    const interval = setInterval(() => {
      Preferences.set({
        key: "state",
        value: JSON.stringify(state),
      });

      // decrement active timer
      if (state.state.active) {
        const newTimers = [...state.state.timers];
        const delta = newTimers[state.state.focus].delta;
        if (delta > 0) {
          // timer can be decremented, do that
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
        } else {
          // timer already at 0, set active to false
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
      } else {
        // timer already at 0, set active to false
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

  // start
  function signalStart() {
    // TODO: add notification start
    // MINUTAE: dont schedule notifications if they are for next day

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
    // TODO: add notification stop

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
    // TODO: add notification stop

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
    // TODO: add notification stop

    signalPause(); // maybe?

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
  };
}
