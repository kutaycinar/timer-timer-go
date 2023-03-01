import { useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
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
    clearAllData,
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

  var heading = "";
  switch (tab) {
    case TabType.Main:
      heading = "Today";
      break;
    case TabType.Analytics:
      heading = "Stats";
      break;
    case TabType.Settings:
      heading = "Settings";
      break;
  }

  return (
    <ThemeProvider>
      <div style={{ height: "100vh", background: "var(--background-color)" }}>
        <div
          style={{
            height: `${delta}%`,
            width: "100%",
            background: "#11191f",
            transition: "all 1s",
          }}
        >
          {state.state.focus == -1 && (
            <div>
              <h2 className="heading"> {heading} </h2>
            </div>
          )}
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
                  {state.state.timers.length === 0 && (
                    <div className="timer">
                      <Modal setHook={addTimer} reset={true}>
                        <CircularProgressbarWithChildren value={0}>
                          <FaPlus size={32} />
                        </CircularProgressbarWithChildren>
                      </Modal>
                    </div>
                  )}
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
            </div>
          )}
          {tab === TabType.Settings && (
            <div>
              <button
                style={{ width: "87%", margin: "32px 24px" }}
                onClick={() => clearSaves()}
              >
                Clear Saves
              </button>
              <button
                style={{ width: "87%", margin: "32px 24px" }}
                onClick={() => clearAllData()}
              >
                Clear All Data
              </button>
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
      </div>
    </ThemeProvider>
  );
}

export default App;
