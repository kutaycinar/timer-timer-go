import { FaPlus } from "react-icons/fa";
import "./App.css";
import Modal from "./components/Add";
import Focus from "./components/Focus";
import Overview from "./components/Overview";
import ThemeProvider from "./components/ThemeProvider";
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
      <ThemeProvider>
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
              editTimer={editTimer}
              deleteTimer={deleteTimer}
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
            <Modal setHook={addTimer} reset={true}>
              <button className="add">
                <FaPlus />
              </button>
            </Modal>
          </div>
        )}
      </ThemeProvider>
    </BrowserWrapper>
  );
}

export default App;
