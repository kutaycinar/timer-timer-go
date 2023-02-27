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
} from "react-icons/fa";
import { TimerType } from "../types";
import "./Focus.css";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getHours,
  getMinutes,
  getSeconds,
  GradientSVG,
  parseTime,
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
      setTaskOver(true);
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
  };

  return (
    <div className="container">
      <button onClick={() => signalStop()} className="back-button">
        <FaChevronLeft />
      </button>
      <h3 className="title">{name}</h3>
      <div className="timer-container">
        <GradientSVG />
        {counter ? (
          <CircularProgressbarWithChildren
            strokeWidth={6}
            value={100 - (delta! / total!) * 100}
            text={delta ? `${delta!} Left` : "Complete!"}
            styles={{
              // path: { stroke: "url(#gradient)", height: "100%" },
              path: { stroke: "var(--primary-hover)", height: "100%" },
              trail: {
                stroke: "#2e2e2e",
              },
            }}
          >
            {total != 1 && (
              <RadialSeparators
                count={total!}
                style={{
                  background: "var(--background-color)",
                  border: "1px solid var(--background-color)",
                  width: "19px",
                  height: `25px`,
                  marginTop: "-5px",
                }}
              />
            )}
          </CircularProgressbarWithChildren>
        ) : (
          <CircularProgressbar
            strokeWidth={5}
            value={100 - (delta! / total!) * 100}
            text={`${prettyTime(delta!)}`}
            styles={{
              path: { stroke: `url(#gradient)`, height: "100%" },
              trail: {
                stroke: "#2e2e2e",
              },
            }}
          />
        )}
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
              <FaPlus />
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
