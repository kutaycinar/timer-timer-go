import { parseTime, TimerType } from "../types";
import {
  FaUndoAlt,
  FaPlay,
  FaPause,
  FaChevronLeft,
  FaCog,
} from "react-icons/fa";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";
import "./Focus.css";

type FocusProps = Partial<TimerType> & {
  signalStart: any;
  signalPause: any;
  signalStop: any;
  signalReset: any;
  isRunning: boolean;
  countNext: any;
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
}: FocusProps) {
  const [key, setKey] = useState(0);

  return (
    <div className="container">
      <button onClick={() => signalStop()} className="back-button">
        <FaChevronLeft />
      </button>
      <h3 className="title">{name}</h3>
      <svg style={{ width: "0px", height: "0px" }}>
        <defs>
          <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="0">
            <stop offset="5%" stopColor="#24DBE4" />
            <stop offset="95%" stopColor="#5681F6" />
          </linearGradient>
        </defs>
      </svg>
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
      <div className="button-container">
        <button
          className="play-button"
          onClick={() => (isRunning ? signalPause() : signalStart())}
        >
          {isRunning ? <FaPause /> : <FaPlay />}
        </button>
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
        <button className="action-button">
          <FaCog />
        </button>
      </div>
    </div>
  );
}

export default Focus;
