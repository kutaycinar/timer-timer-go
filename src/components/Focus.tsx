import { parseTime, TimerType } from "../types";
import { BsPlayFill, BsPauseFill, BsChevronLeft } from "react-icons/bs";
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
      <div className="top-row">
        <button onClick={() => signalStop()} className="back-button">
          <BsChevronLeft />
        </button>
        <h4 className="title">{name}</h4>
      </div>
      <CountdownCircleTimer
        key={key}
        isPlaying={isRunning}
        duration={total || 0}
        initialRemainingTime={delta}
        colors={"#A30000"}
      >
        {({ remainingTime }) => parseTime(remainingTime)}
      </CountdownCircleTimer>
      <br />
      <br />
      <button onClick={() => (isRunning ? signalPause() : signalStart())}>
        {isRunning ? <BsPauseFill /> : <BsPlayFill />}
      </button>
      <br />
      <button
        className="secondary"
        onClick={() => {
          signalReset();
          setKey(key + 1);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Focus;
