import "./App.css";
import Add from "./components/Add";
import Focus from "./components/Focus";
import Overview from "./components/Overview";
import Timer from "./components/Timer";
import BrowserWrapper from "./components/Wrapper";
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
    countNext,
    reverseSelf,
  } = useTimer();

  return (
    <BrowserWrapper>
      {/* <pre>{JSON.stringify(state, undefined, 2)}</pre> */}
      {state.state.focus !== -1 ? (
        <div>
          <Focus
            {...state.state.timers[state.state.focus]}
            signalStart={signalStart}
            signalPause={signalPause}
            signalStop={signalStop}
            signalReset={signalReset}
            isRunning={state.state.active}
            countNext={countNext}
            reverseSelf={reverseSelf}
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
    </BrowserWrapper>
  );
}

export default App;
