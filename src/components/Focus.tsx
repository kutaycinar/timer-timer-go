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
import { GradientSVG, parseTime, RadialSeparators } from "../utils";

type FocusProps = Partial<TimerType> & {
  signalStart: any;
  signalPause: any;
  signalStop: any;
  signalReset: any;
  isRunning: boolean;
  countNext: any;
  reverseSelf: any;
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
  reverseSelf,
}: FocusProps) {
  const [key, setKey] = useState(0);

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

  return (
    <div className="container">
      <button onClick={() => signalStop()} className="back-button">
        <FaChevronLeft />
      </button>
      <h3 className="title">{name}</h3>
      <div className="timer-container">
        <GradientSVG />
        {counter ? <Counter /> : <Timer />}

        {!counter && (
          <div className="button-container">
            <button
              className="play-button"
              onClick={() => (isRunning ? signalPause() : signalStart())}
              disabled={delta === 0}
            >
              {isRunning ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        )}

        <br />
        {counter && (
          <div className="button-container">
            <button
              className="play-button"
              onClick={() => countNext()}
              disabled={delta === 0}
            >
              <FaPlus />
            </button>
          </div>
        )}
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
        <button className="action-button" onClick={() => reverseSelf()}>
          <FaCog />
        </button>
      </div>
    </div>
  );
}

export default Focus;
