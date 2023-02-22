import { parseTime, TimerType } from "../types";

type FocusProps = Partial<TimerType> & {
  signalStart: any;
  signalPause: any;
  signalStop: any;
  signalReset: any;
};

function Focus({
  name,
  delta,
  total,
  signalPause,
  signalStop,
  signalStart,
  signalReset,
}: FocusProps) {
  return (
    <div className="vert-cent">
      <h4>{name}</h4>
      <div>{parseTime(delta!)}</div>
      <progress value={delta} max={total} />
      <br />
      <br />
      <button onClick={() => signalStart()}>Start</button>
      <button onClick={() => signalPause()}>Pause</button>
      <br />
      <button onClick={() => signalStop()}>Stop</button>
      <br />
      <button className="secondary" onClick={() => signalReset()}>
        Reset
      </button>
    </div>
  );
}

export default Focus;
