import dayjs from "dayjs";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Save } from "../../types";

function Summary({ data }: { data: Save[] }) {
  const today = dayjs();
  let lastWeek: Save[] = [];
  for (let i = 7; i >= 1; i--) {
    const date = today.subtract(i, "days");
    const save = data.find((s: Save) => dayjs(s.date).isSame(date, "day"));
    if (save) {
      lastWeek.push(save);
    } else {
      lastWeek.push({
        completion: 0,
        date: date.valueOf(),
        timers: [], //TODO: Backfill timers from previous day with progress
      });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        marginBottom: "10px",
        height: "auto",
      }}
    >
      {lastWeek.map((save: Save, idx: number) => (
        <CircularProgressbarWithChildren value={save.completion} key={idx}>
          <h6 style={{ marginTop: "32px" }}>
            {dayjs(save.date).format("ddd")}
          </h6>
        </CircularProgressbarWithChildren>
      ))}
    </div>
  );
}

export default Summary;
