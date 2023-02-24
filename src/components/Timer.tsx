import { TimerType } from "../types";
import { parseTime } from "../utils";

type TimerProps = TimerType & {
  idx: number;
  deleteTimer: any;
  focusTimer: any;
};

function Timer({
  name,
  delta,
  total,
  counter,
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
          {delta !== 0 ? (
            <div>{counter ? delta : parseTime(delta)} left</div>
          ) : (
            <div>Complete!</div>
          )}
          <progress value={total - delta} max={total}></progress>
        </a>
      </div>
    </div>
  );
}

export default Timer;
