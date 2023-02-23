import { parseTime, TimerType } from "../types";

type FocusProps = Partial<TimerType> & {
  signalStart: any;
  signalPause: any;
  signalStop: any;
  signalReset: any;
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
  countNext,
}: FocusProps) {
  return (
    <div className="vert-cent">
      <h4>{name}</h4>
      <div>{delta}</div>
      <progress value={delta} max={total} />
      <br />
      <br />
      {!counter ? (
        <div>
          <button onClick={() => signalStart()}>Start</button>
          <button onClick={() => signalPause()}>Pause</button>
        </div>
      ) : (
        <button onClick={() => countNext()}>Next</button>
      )}
      <br />
      <br />
      <button onClick={() => signalStop()}>Back</button>
      <button className="secondary" onClick={() => signalReset()}>
        Reset
      </button>
    </div>
  );
}

export default Focus;
