import { useState } from "react";
import { FaChartLine, FaClock, FaCog, FaPlus } from "react-icons/fa";
import Analytics from "./Analytics";
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
    clearSaves,
  } = useTimer();

  enum TabType {
    Main,
    Analytics,
    Settings,
  }

  const [tab, setTab] = useState(TabType.Main);

  var { delta } = getOverall();
  delta *= 100;
  delta = 100 - delta;

  return (
    <ThemeProvider>
      <BrowserWrapper>
        <div
          style={{
            height: `${delta}%`,
            width: "100%",
            background: "#11191f",
            transition: "all 1s",
          }}
        >
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
                  <div className="overview">
                    <h2 style={{ marginBottom: 15 }}> Today </h2>
                  </div>
                  {state.state.timers.map((t, idx) => (
                    <Timer
                      key={t.name}
                      {...t}
                      idx={idx}
                      deleteTimer={deleteTimer}
                      focusTimer={focusTimer}
                      color={t.color}
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
              <Analytics saves={state.state.saves} />
              {/* <pre>{JSON.stringify(state.state.saves, undefined, 2)}</pre> */}
            </div>
          )}
          {tab === TabType.Settings && (
            <div>
              Settings
              <button onClick={() => clearSaves()}>Clear Saves</button>
            </div>
          )}
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
        </div>
      </BrowserWrapper>
    </ThemeProvider>
  );
}

export default App;
