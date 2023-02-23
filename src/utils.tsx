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

export const parseTime = (time: number): string => {
  const hours = getHours(time);
  const minutes = getMinutes(time);
  const seconds = getSeconds(time);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export function isSameDay(timestamp1: number, timestamp2: number) {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  return date1.toDateString() == date2.toDateString();
}

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
