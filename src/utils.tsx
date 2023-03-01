import { Dayjs } from "dayjs";
import _ from "lodash";

export const getSeconds = (time: number) => {
  return time % 60;
};

export const getMinutes = (time: number) => {
  return Math.floor(time / 60) % 60;
};

export const getHours = (time: number) => {
  return Math.floor(time / 3600);
};

const pad = (time: number): string => {
  return String(time).padStart(2, "0");
};

export const prettyTime = (time: number) => {
  const hours = getHours(time);
  const minutes = getMinutes(time);
  const seconds = getSeconds(time);
  var text = "";
  text += hours ? hours + "h" : "";
  text += minutes ? minutes + "m" : "";
  text += seconds ? seconds + "s" : "";
  text = text || "Complete!";
  return text;
};

export const parseTime = (time: number): string => {
  const hours = getHours(time);
  const minutes = getMinutes(time);
  const seconds = getSeconds(time);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

function Separator(props: any) {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        transform: `rotate(${props.turns}turn)`,
      }}
    >
      <div style={props.style} />
    </div>
  );
}

export function RadialSeparators(props: any) {
  const turns = 1 / props.count;
  return (
    <>
      {_.range(props.count).map((index) => (
        <Separator key={index} turns={index * turns} style={props.style} />
      ))}
    </>
  );
}

export function GradientSVG() {
  const gradientTransform = `rotate(0)`;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={"gradient"} gradientTransform={gradientTransform}>
          <stop offset="5%" stopColor="#24DBE4" />
          <stop offset="95%" stopColor="#5681F6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
