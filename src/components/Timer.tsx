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
  color,
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
          // backgroundPadding={delta == 0 ? 100 : 0}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: color,
            strokeLinecap: "butt",
            trailColor: color + "20",
            // trailColor: "#2e2e2e",
            backgroundColor: delta ? "transparent" : color + "A0",
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
                background: "#11191f",
                width: "5px",
                height: `${15}%`,
                margin: "-1px",
              }}
            />
          )}
        </CircularProgressbarWithChildren>
      </a>
    </div>
  );
}

export default Timer;
