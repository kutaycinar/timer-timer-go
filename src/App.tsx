import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./App.css";
import NavBar from "./components/NavBar";
import ThemeProvider from "./components/ThemeProvider";
import { initGlassfy, SkuInfo } from "./iap";
import Analytics from "./Pages/Analytics";
import Main from "./Pages/Main";
import Settings from "./Pages/Settings";
import { StateContext } from "./StateProvider";
import { TabType, themeOption } from "./types";

function App() {
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

  // Set up gesture controls for page navigation.
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (state.state.focus !== -1) return;
      setTab((t: TabType) => Math.min(2, t + 1));
    },
    onSwipedRight: () => {
      setTab((t: TabType) => Math.max(0, t - 1));
    },
  });

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
      <div
        style={{ height: "100vh", background: "var(--background-color)" }}
        {...handlers}
      >
        {/* <pre style={{ height: 200 }}>{JSON.stringify(state, undefined, 2)}</pre> */}
        <div
          style={{
            height: `${delta}%`,
            width: "100%",
            background: "var(--progress-fill)",
            transition: "all 0.5s",
            position: "absolute",
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
        {state.state.focus === -1 && <NavBar tab={tab} setTab={setTab} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
