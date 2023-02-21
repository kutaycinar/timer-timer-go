import { parseTime, TimerType } from "../types";

type TimerProps = TimerType & {
  idx: number;
  removeTimer: any;
  makeFocus: any;
};

function Timer({
  name,
  delta,
  total,
  removeTimer,
  makeFocus,
  idx,
}: TimerProps) {
  return (
    <div className="timer">
      <div style={{ margin: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>{name}</strong>
          <button className="contrast circ" onClick={() => removeTimer(name)}>
            ✖
          </button>
        </div>
        <a onClick={() => makeFocus(idx)}>
          <div>{parseTime(delta)}</div>
          <progress value={delta} max={total}></progress>
        </a>
      </div>
    </div>
  );
}

export default Timer;
