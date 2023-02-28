import dayjs from "dayjs";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Save } from "../../types";

function Summary({ data }: { data: Save[] }) {
  const lastWeek = data.filter((save: Save) => {
    return Math.abs(dayjs().diff(dayjs(save.date), "days")) < 7;
  });

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {lastWeek.map((save: Save) => (
        <CircularProgressbarWithChildren
          value={save.completion}
          text={dayjs(save.date).format("ddd")}
        />
      ))}
    </div>
  );
}

export default Summary;
