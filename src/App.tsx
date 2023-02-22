import "./App.css";
import Add from "./components/Add";
import Focus from "./components/Focus";
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
    resetAllTimers,
    sendNotification,
  } = useTimer();

  return (
    <div>
      <pre>{JSON.stringify(state, undefined, 2)}</pre>
      {state.state.focus !== -1 ? (
        <div>
          <Focus
            {...state.state.timers[state.state.focus]}
            signalStart={signalStart}
            signalPause={signalPause}
            signalStop={signalStop}
            signalReset={signalReset}
          />
          <button
            className="add secondary shift"
            onClick={() => {
              console.log("button preseed");
              sendNotification();
            }}
          >
            Send ntf
          </button>
        </div>
      ) : (
        <div className="page">
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
          <button
            className="add secondary shift"
            onClick={() => {
              console.log("button preseed");
              sendNotification();
            }}
          >
            Send ntf
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
