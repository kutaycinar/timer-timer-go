import { parseTime, TimerType } from "../types";
import { BsPlayFill, BsPauseFill, BsChevronLeft } from "react-icons/bs";

type FocusProps = Partial<TimerType> & {
  signalStart: any;
  signalPause: any;
  signalStop: any;
  signalReset: any;
  isRunning: boolean;
};

function Focus({
  name,
  delta,
  total,
  signalPause,
  signalStop,
  signalStart,
  signalReset,
  isRunning,
}: FocusProps) {
  return (
    <div style={{ margin: "5px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => signalStop()}
          style={{ flex: 0, backgroundColor: "transparent", border: "none" }}
        >
          <BsChevronLeft />
        </button>
        <h4 style={{ flex: 1, textAlign: "center" }}>{name}</h4>
      </div>
      <div>{parseTime(delta!)}</div>
      <progress value={delta} max={total} />
      <br />
      <br />
      <button onClick={() => (isRunning ? signalPause() : signalStart())}>
        {isRunning ? <BsPauseFill /> : <BsPlayFill />}
      </button>
      <br />
      <button className="secondary" onClick={() => signalReset()}>
        Reset
      </button>
    </div>
  );
}

export default Focus;
