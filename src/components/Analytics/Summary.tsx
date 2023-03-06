import dayjs from "dayjs";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Save } from "../../types";

function Summary({ data }: { data: Save[] }) {
  const lastWeek = data.filter((save: Save) => {
    return Math.abs(dayjs().diff(dayjs(save.date), "days")) < 7;
  });

  return (
    <div>
      {lastWeek.map((save: Save) => (
        <CircularProgressbarWithChildren value={save.completion} />
      ))}
    </div>
  );
}

export default Summary;
