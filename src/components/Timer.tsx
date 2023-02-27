import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { TimerType } from "../types";
import { prettyTime } from "../utils";

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
          text={
            counter
              ? delta
                ? `${delta} left`
                : "Complete!"
              : `${prettyTime(delta)}`
          }
        ></CircularProgressbarWithChildren>
      </a>
    </div>
  );
}

export default Timer;
