import { Glassfy } from "capacitor-plugin-glassfy";
import { useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { FaChartLine, FaClock, FaCog, FaPlus } from "react-icons/fa";
import Analytics from "./Analytics";
import "./App.css";
import Add from "./components/Add";
import Confirmation from "./components/Confirmation";
import Focus from "./components/Focus";
import ThemeProvider from "./components/ThemeProvider";
import Timer from "./components/Timer";
import { useTimer } from "./hooks";
import { initGlassfy, SkuInfo } from "./iap";
import { FREE_MAX_TIMERS } from "./types";

function App() {
  const {
    state,
    setState,
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

  const [proSku, setProSku] = useState<SkuInfo>({
    isPro: undefined,
    proSku: undefined,
  });

  useEffect(() => {
    async function init() {
      const skuInfo = await initGlassfy();
      setProSku(skuInfo);
      setState((prevState) => {
        return {
          state: {
            ...prevState.state,
            promode: skuInfo.isPro ?? prevState.state.promode,
          },
        };
      });
    }
    init();
  }, []);

  async function purchaseSKU() {
    try {
      const transaction = await Glassfy.purchaseSku({ sku: proSku.proSku! });
      const permission = transaction.permissions.all.find(
        (p) => p.permissionId === "pro_mode"
      );
      if (permission && permission.isValid) {
        setProSku({ ...proSku, isPro: true });
      }
    } catch (e) {
      console.log("Purchase Error");
    }
  }

  // init
  return (
    <ThemeProvider>
      <div style={{ height: "100vh", background: "var(--background-color)" }}>
        <div
          className="outer"
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
                <div className="page inner">
                  {state.state.timers.length === 0 && (
                    <div className="timer">
                      <Add setHook={addTimer} reset={true} proInfo={proSku}>
                        <CircularProgressbarWithChildren value={0}>
                          <FaPlus size={32} />
                        </CircularProgressbarWithChildren>
                      </Add>
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
                  {proSku.isPro ||
                  state.state.timers.length < FREE_MAX_TIMERS ? (
                    <Add setHook={addTimer} reset={true}>
                      <button className="add">
                        <FaPlus />
                      </button>
                    </Add>
                  ) : (
                    <Confirmation
                      title={"Buy Pro"}
                      body={
                        "You have reached the three timer limit for the trial period. Buy pro mode to add more activities. $" +
                        proSku.proSku?.product.price
                      }
                      callback={purchaseSKU}
                      type={"add"}
                      invert
                      confirmText="Purchase"
                      disabled={!proSku.proSku}
                    >
                      <FaPlus />
                    </Confirmation>
                  )}
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
              <Confirmation
                title={"Buy Pro"}
                body={
                  "Upgrade to Pro Mode and unlock unlimited tasks, giving you the freedom to track all of your habits without any restrictions."
                }
                callback={purchaseSKU}
                type={"settings-button"}
                invert
                confirmText="Purchase"
                disabled={!proSku.proSku || proSku.isPro}
              >
                Upgrade Pro Mode
              </Confirmation>
              {/* TODO: add restrore puchases */}
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
