import { useEffect, useState } from "react";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";
import {
  FaChevronLeft,
  FaCog,
  FaPause,
  FaPlay,
  FaUndoAlt,
  FaPlus,
  FaTrash,
  FaForward,
  FaCheck,
} from "react-icons/fa";
import { TimerType } from "../types";
import "./Focus.css";
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getHours,
  getMinutes,
  getSeconds,
  GradientSVG,
  prettyTime,
  RadialSeparators,
} from "../utils";
import Modal from "./Add";

const confettiProps: ConfettiProps = {
  force: 0.6,
  duration: 2500,
  particleCount: 100,
  width: 1000,
  colors: ["#041E43", "#1471BF", "#5BB4DC", "#FC027B", "#66D805"],
};

type FocusProps = Partial<TimerType> & {
  signalStart: any;
  signalPause: any;
  signalStop: any;
  signalReset: any;
  isRunning: boolean;
  countNext: any;
  editTimer: any;
  deleteTimer: any;
};

function Focus({
  name,
  delta,
  total,
  counter,
  color,
  signalPause,
  signalStop,
  signalStart,
  signalReset,
  isRunning,
  countNext,
  editTimer,
  deleteTimer,
}: FocusProps) {
  const [key, setKey] = useState(0);
  const [prevDelta, setPrevDelta] = useState(delta);
  const [taskOver, setTaskOver] = useState(false);

  useEffect(() => {
    if (delta === 0 && prevDelta !== 0) {
      setTimeout(() => {
        setTaskOver(true);
      }, 150);
    }
    setPrevDelta(delta);
  }, [delta]);

  const init = {
    name,
    seconds: getSeconds(total!),
    minutes: getMinutes(total!),
    hour: getHours(total!),
    goal: counter ? total : 1,
    counter,
    color,
  };

  return (
    <div className="container">
      <button onClick={() => signalStop()} className="back-button">
        <FaChevronLeft size={32} />
      </button>
      <h3 className="title">{name}</h3>
      <div className="timer-container">
        <GradientSVG />
        <CircularProgressbarWithChildren
          strokeWidth={6}
          background
          // backgroundPadding={delta == 0 ? 100 : 0}
          value={100 - (delta! / total!) * 100}
          styles={buildStyles({
            pathColor: color,
            strokeLinecap: "butt",
            // trailColor: "#2e2e2e",
            trailColor: color + "20",
            backgroundColor: delta ? "#11191f" : color || "#1bb3e6" + "A0",
          })}
        >
          {delta ? (
            <h1 style={{ margin: "auto" }}>
              {counter ? `${delta} left` : `${prettyTime(delta)}`}
            </h1>
          ) : (
            <FaCheck fontSize={100} color="var(--text-primary)" />
          )}
          {counter && total != 1 && delta != 0 && (
            <RadialSeparators
              count={total!}
              style={{
                background: "#11191f",
                border: "1px solid #11191f",
                width: "19px",
                height: `20px`,
                margin: "-1px",
              }}
            />
          )}
        </CircularProgressbarWithChildren>
        {taskOver && (
          <div style={{ position: "absolute", left: "50%", top: "50%" }}>
            <ConfettiExplosion {...confettiProps} />
          </div>
        )}
        <br />
        <br />
        <div className="button-container">
          <button
            className="play-button"
            onClick={() =>
              counter ? countNext() : isRunning ? signalPause() : signalStart()
            }
            disabled={delta === 0}
          >
            {counter ? (
              <FaForward />
            ) : isRunning ? (
              <FaPause />
            ) : (
              <FaPlay style={{ position: "relative", left: "2px" }} />
            )}
          </button>
        </div>
      </div>
      <div className="footer-buttons">
        <button
          className="action-button"
          onClick={() => {
            signalReset();
            setTaskOver(false);
            setKey(key + 1);
          }}
        >
          <FaUndoAlt />
        </button>
        <button
          className="action-button"
          onClick={() => {
            deleteTimer(name);
          }}
        >
          <FaTrash />
        </button>
        <Modal setHook={editTimer} initialValues={init}>
          <button className="action-button">
            <FaCog />
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default Focus;
