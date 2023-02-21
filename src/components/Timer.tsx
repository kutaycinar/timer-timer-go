import { parseTime, TimerType } from "../types";

type TimerProps = TimerType & {
  idx: number;
  deleteTimer: any;
  focusTimer: any;
};

function Timer({
  name,
  delta,
  total,
  deleteTimer,
  focusTimer,
  idx,
}: TimerProps) {
  return (
    <div className="timer">
      <div style={{ margin: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>{name}</strong>
          <button className="contrast circ" onClick={() => deleteTimer(name)}>
            ✖
          </button>
        </div>
        <a onClick={() => focusTimer(idx)}>
          <div>{parseTime(delta)}</div>
          <progress value={delta} max={total}></progress>
        </a>
      </div>
    </div>
  );
}

export default Timer;
