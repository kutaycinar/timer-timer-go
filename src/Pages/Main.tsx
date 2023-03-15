import { Capacitor } from "@capacitor/core";
import { Glassfy } from "capacitor-plugin-glassfy";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { FaPlus } from "react-icons/fa";
import Add from "../components/Add";
import Confirmation from "../components/Confirmation";
import Focus from "../components/Focus";
import Timer from "../components/Timer";
import { SkuInfo, initGlassfy } from "../iap";
import { StateContext } from "../StateProvider";
import { FREE_MAX_TIMERS, State, TimerType } from "../types";

function Main() {
  const { state, setProMode, addTimer, deleteTimer, focusTimer } =
    useContext(StateContext);

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

  async function purchaseSKU() {
    if (!proSku) return;
    try {
      const transaction = await Glassfy.purchaseSku({ sku: proSku.proSku! });
      const permission = transaction.permissions.all.find(
        (p) => p.permissionId === "pro_mode"
      );
      if (permission && permission.isValid) {
        setProSku({ ...proSku, isPro: true });
      }
    } catch (e) {
      console.error("Purchase Error");
    }
  }

  const today = dayjs().day();

  return (
    <div>
      {state.state.focus == -1 && <div className="heading"> Today </div>}
      {state.state.focus !== -1 ? (
        <div>
          <Focus {...state.state.timers[state.state.focus]} />
        </div>
      ) : (
        <div className="page">
          {state.state.timers.length === 0 && (
            <div className="timer">
              <Add setHook={addTimer} reset={true} timers={state.state.timers}>
                <CircularProgressbarWithChildren value={0}>
                  <FaPlus size={32} />
                </CircularProgressbarWithChildren>
              </Add>
            </div>
          )}
          <div className="child">
            {state.state.timers.map((t: TimerType, idx: number) => {
              if (!t.days.includes(today)) return;
              return (
                <Timer
                  key={t.name}
                  {...t}
                  idx={idx}
                  deleteTimer={deleteTimer}
                  focusTimer={focusTimer}
                  color={t.color}
                />
              );
            })}
          </div>
          {proSku?.isPro ||
          state.state.timers.length < FREE_MAX_TIMERS ||
          !Capacitor.isNativePlatform() ? (
            <Add setHook={addTimer} reset={true} timers={state.state.timers}>
              <button className="add">
                <FaPlus />
              </button>
            </Add>
          ) : (
            <Confirmation
              title={"Buy Pro"}
              body={
                "You have reached the three task limit for the trial period. Buy pro mode to add more activities. $" +
                proSku?.proSku?.product.price
              }
              callback={purchaseSKU}
              type={"add"}
              invert
              confirmText="Purchase"
              disabled={!proSku?.proSku}
            >
              <FaPlus />
            </Confirmation>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
