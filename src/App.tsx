import "./App.css";
import Add from "./components/Add";
import Focus from "./components/Focus";
import Overview from "./components/Overview";
import Timer from "./components/Timer";
import { useTimer } from "./hooks";

function App() {
  const {
    state,
    addTimer,
    deleteTimer,
    focusTimer,
    signalStart,
    signalPause,
    signalStop,
    signalReset,
    getOverall,
  } = useTimer();

  return (
    <div>
      {state.state.focus !== -1 ? (
        <div>
          <Focus
            {...state.state.timers[state.state.focus]}
            signalStart={signalStart}
            signalPause={signalPause}
            signalStop={signalStop}
            signalReset={signalReset}
            isRunning={state.state.active}
          />
        </div>
      ) : (
        <div className="page">
          <Overview {...getOverall()} />
          {state.state.timers.map((t, idx) => (
            <Timer
              key={t.name}
              {...t}
              idx={idx}
              deleteTimer={deleteTimer}
              focusTimer={focusTimer}
            />
          ))}
          <Add addTimer={addTimer} />
        </div>
      )}
    </div>
  );
}

export default App;
