import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
} from "chart.js";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import { Save } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics({ saves }: { saves: Save[] }) {
  const lastWeek = saves.filter((save: Save) => {
    // console.log(dayjs(save.date).diff(dayjs(), "days"));
    return dayjs(save.date).diff(dayjs(), "days") < 7;
  });
  const data = {
    labels: lastWeek.map((s: Save) => {
      console.log(dayjs(s.date).format("dddd"));
      return dayjs(s.date).format("dddd");
    }),
    datasets: [
      {
        label: "Week Summary",
        data: lastWeek.map((s: Save) => s.completion),
        borderWidth: 1,
        backgroundColor: "rgba(255, 99, 132, 0.4)",
      },
    ],
  };

  return (
    <div>
      <>
        <h1>Analytics</h1>
        <Bar data={data} />
        {/* {lastWeek.forEach((s: Save) => console.log(s))} */}
        {/* {console.log(data.labels)} */}
      </>
    </div>
  );
}

export default Analytics;
