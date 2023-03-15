import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { FaChartLine, FaClock, FaCog } from "react-icons/fa";
import Analytics from "./Analytics";
import "./App.css";
import Confirmation from "./components/Confirmation";
import ThemeProvider from "./components/ThemeProvider";
import Main from "./Pages/Main";
import { StateContext } from "./StateProvider";
import { themeOption } from "./types";

function App() {
  enum TabType {
    Main,
    Analytics,
    Settings,
  }

  const { state, getOverall, clearSaves, clearAllData } =
    useContext(StateContext);

  const [tab, setTab] = useState(TabType.Main);
  const [theme, setTheme] = useState<themeOption>("dark");

  var { delta } = getOverall(dayjs());
  delta *= 100;
  if (state.state.timers.length == 0) delta = 100;

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

  // Load the theme from storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as themeOption);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // init
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "100vh", background: "var(--background-color)" }}>
        {/* <pre style={{ height: 200 }}>{JSON.stringify(state, undefined, 2)}</pre> */}
        <div
          style={{
            height: `${delta}%`,
            width: "100%",
            background: "var(--progress-fill)",
            transition: "all 1s",
            position: "fixed",
            zIndex: 0,
          }}
        />
        {tab === TabType.Main && <Main />}
        {tab === TabType.Analytics && (
          <div>
            <div className="heading"> {heading} </div>
            <Analytics saves={state.state.saves} />
          </div>
        )}
        {tab === TabType.Settings && (
          <div>
            <div className="heading"> {heading} </div>
            <div style={{ padding: 20 }}>
              <Confirmation
                type="settings-button"
                title="Clear Save Data"
                body="All stats from previous days will be deleted. Today's data and your timers will be preserved."
                callback={() => clearSaves()}
              >
                Clear Saves
              </Confirmation>
              <Confirmation
                type="settings-button"
                title="Clear All Data"
                body="All stats and tasks will be deleted. Your app be reset to factory default."
                callback={() => clearAllData()}
              >
                Clear All Data
              </Confirmation>
              {/* <Confirmation
                title={"Buy Pro"}
                body={
                  "Upgrade to Pro Mode and unlock unlimited tasks, giving you the freedom to track all of your habits without any restrictions."
                }
                callback={purchaseSKU}
                type={"settings-button"}
                invert
                confirmText="Purchase"
                disabled={!proSku?.proSku || proSku?.isPro}
              >
                Upgrade Pro Mode
              </Confirmation> */}
              <button
                className="settings-button"
                onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
              >
                Toggle Theme
              </button>
            </div>
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
                  <FaClock className="nav-icon" size={"24px"} />
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
                  <FaChartLine className="nav-icon" size={"24px"} />
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
                  <FaCog className="nav-icon" size={"24px"} />
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
