import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { FaChartLine, FaClock, FaCog } from "react-icons/fa";
import "./App.css";
import ThemeProvider from "./components/ThemeProvider";
import { initGlassfy, SkuInfo } from "./iap";
import Analytics from "./Pages/Analytics";
import Main from "./Pages/Main";
import Settings from "./Pages/Settings";
import { StateContext } from "./StateProvider";
import { themeOption } from "./types";

function App() {
  enum TabType {
    Main,
    Analytics,
    Settings,
  }

  const { state, getOverall, setProMode } = useContext(StateContext);

  const [tab, setTab] = useState(TabType.Main);
  const [theme, setTheme] = useState<themeOption>("dark");

  var { delta } = getOverall(dayjs());
  delta *= 100;
  if (state.state.timers.length == 0) delta = 100;

  const [proSku, setProSku] = useState<SkuInfo>({
    isPro: undefined,
    proSku: undefined,
  });

  useEffect(() => {
    async function init() {
      const skuInfo = await initGlassfy();
      setProSku(skuInfo);
      setProMode(skuInfo);
    }
    init();
  }, []);

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
        {tab === TabType.Main && <Main proSku={proSku} />}
        {tab === TabType.Analytics && (
          <div>
            <div className="heading"> {heading} </div>
            <Analytics saves={state.state.saves} />
          </div>
        )}
        {tab === TabType.Settings && (
          <Settings theme={theme} setTheme={setTheme} proSku={proSku} />
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
