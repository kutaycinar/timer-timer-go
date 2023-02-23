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
};

function Focus({
  name,
  delta,
  total,
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
      <CountdownCircleTimer
        key={key}
        isPlaying={isRunning}
        duration={total || 0}
        initialRemainingTime={delta}
        colors={"#A30000"}
      >
        {({ remainingTime }) => parseTime(remainingTime)}
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
