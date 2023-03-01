import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { FaCheck, FaPlus } from "react-icons/fa";
import { TimerType } from "../types";
import { prettyTime, RadialSeparators } from "../utils";

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
      <a onClick={() => focusTimer(idx)}>
        <div className="timer-title">
          <strong>{name}</strong>
        </div>
        <CircularProgressbarWithChildren
          value={((total - delta) / total) * 100}
          background
          strokeWidth={10}
          styles={buildStyles({
            pathColor: "var(--primary-hover)",

            trailColor: "#2e2e2e",
            backgroundColor: delta ? "transparent" : "rgba(26, 179, 230, 0.4)",
          })}
        >
          {delta ? (
            <h3 style={{ margin: "auto" }}>
              {counter ? `${delta} left` : `${prettyTime(delta)}`}
            </h3>
          ) : (
            <FaCheck fontSize={32} color="var(--text-primary)" />
          )}
          {counter && delta !== 0 && total != 1 && (
            <RadialSeparators
              count={total!}
              style={{
                background: "var(--background)",
                width: "10px",
                height: `${10}%`,
              }}
            />
          )}
        </CircularProgressbarWithChildren>
      </a>
    </div>
  );
}

export default Timer;
