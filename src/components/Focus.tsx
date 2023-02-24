import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  FaChevronLeft,
  FaCog,
  FaPause,
  FaPlay,
  FaUndoAlt,
  FaPlus,
} from "react-icons/fa";
import { TimerType } from "../types";
import "./Focus.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getHours,
  getMinutes,
  getSeconds,
  GradientSVG,
  parseTime,
  RadialSeparators,
} from "../utils";
import Modal from "./Add";

type FocusProps = Partial<TimerType> & {
  signalStart: any;
  signalPause: any;
  signalStop: any;
  signalReset: any;
  isRunning: boolean;
  countNext: any;
  editTimer: any;
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
}: FocusProps) {
  const [key, setKey] = useState(0);

  console.log("test");

  function Timer() {
    return (
      <CountdownCircleTimer
        key={key}
        isPlaying={isRunning}
        duration={total || 0}
        initialRemainingTime={delta}
        colors={"url(#gradient)"}
        size={300}
        strokeWidth={15}
        trailStrokeWidth={30}
        trailColor="#292660"
      >
        {({ remainingTime, color = "A30000" }) => (
          <h1 className="timer-text" color={color}>
            {parseTime(remainingTime)}{" "}
          </h1>
        )}
      </CountdownCircleTimer>
    );
  }

  function Counter() {
    return (
      <CircularProgressbarWithChildren
        strokeWidth={5}
        value={100 - (delta! / total!) * 100}
        text={`${delta!}`}
        styles={{
          path: { stroke: `url(#gradient)`, height: "100%" },
          trail: {
            stroke: "#2e2e2e",
          },
        }}
      >
        <RadialSeparators
          count={total!}
          style={{
            background: "var(--background-color)",
            border: "1px solid var(--background-color)",
            width: "19px",
            height: `19px`,
          }}
        />
      </CircularProgressbarWithChildren>
    );
  }

  const init = {
    name,
    seconds: getSeconds(total!),
    minutes: getMinutes(total!),
    hour: getHours(total!),
    limit: counter ? total : 1,
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
        {counter ? <Counter /> : <Timer />}
        <br />
        <div className="button-container">
          <button
            className="play-button"
            onClick={() =>
              counter ? countNext() : isRunning ? signalPause() : signalStart()
            }
            disabled={delta === 0}
          >
            {counter ? <FaPlus /> : isRunning ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>
      <div className="footer-buttons">
        <button
          className="action-button"
          onClick={() => {
            signalReset();
            setKey(key + 1);
          }}
        >
          <FaUndoAlt />
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
