import dayjs from "dayjs";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Save } from "../../types";

function Summary({ data }: { data: Save[] }) {
  const lastWeek = data.filter((save: Save) => {
    return Math.abs(dayjs().diff(dayjs(save.date), "days")) < 7;
  });

  return (
    <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
      {lastWeek.map((save: Save, idx: number) => (
        <CircularProgressbarWithChildren value={save.completion} key={idx}>
          <h6 style={{ margin: "auto" }}>{dayjs(save.date).format("ddd")}</h6>
        </CircularProgressbarWithChildren>
      ))}
    </div>
  );
}

export default Summary;
