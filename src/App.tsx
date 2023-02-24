import "./App.css";
import Modal from "./components/Add";
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
    editTimer,
  } = useTimer();

  return (
    <BrowserWrapper>
      <pre>{JSON.stringify(state, undefined, 2)}</pre>
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
            editTimer={editTimer}
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
          <Modal setHook={addTimer}>
            <button className="add">Add</button>
          </Modal>
        </div>
      )}
    </BrowserWrapper>
  );
}

export default App;
