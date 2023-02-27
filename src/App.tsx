import { useState } from "react";
import {
  FaAtom,
  FaChartBar,
  FaChartLine,
  FaClock,
  FaCog,
  FaPlus,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
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
    saveAllTimers,
    clearSaves,
  } = useTimer();

  enum TabType {
    Main,
    Analytics,
    Settings,
  }

  const [tab, setTab] = useState(TabType.Main);

  return (
    <ThemeProvider>
      <BrowserWrapper>
        {/* <pre>{JSON.stringify(state, undefined, 2)}</pre> */}
        {tab === TabType.Main && (
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
          </div>
        )}
        {tab === TabType.Analytics && (
          <div>
            Analytics
            <pre>{JSON.stringify(state.state.saves, undefined, 2)}</pre>
            <button onClick={() => saveAllTimers()}>Save</button>
            <button onClick={() => clearSaves()}>Clear Saves</button>
          </div>
        )}
        {tab === TabType.Settings && <div>Settings</div>}
        {state.state.focus === -1 && (
          <nav className="navbar">
            <ul>
              <li>
                <a
                  href="#"
                  className={`${tab === TabType.Main && "selected"}`}
                  onClick={() => setTab(TabType.Main)}
                >
                  <FaClock size={"24px"} />
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="#"
                  className={`${tab === TabType.Analytics && "selected"}`}
                  onClick={() => setTab(TabType.Analytics)}
                >
                  <FaChartLine size={"24px"} />
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="#"
                  className={`${tab === TabType.Settings && "selected"}`}
                  onClick={() => setTab(TabType.Settings)}
                >
                  <FaCog size={"24px"} />
                </a>
              </li>
            </ul>
          </nav>
        )}
      </BrowserWrapper>
    </ThemeProvider>
  );
}

export default App;
