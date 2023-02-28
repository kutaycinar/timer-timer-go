import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
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
    return Math.abs(dayjs().diff(dayjs(save.date), "days")) < 7;
  });
  const data = {
    labels: lastWeek.map((s: Save) => {
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
        <Bar
          data={data}
          options={{
            scales: {
              y: {
                suggestedMax: 100,
                position: "left",
                ticks: {
                  count: 5,
                },
              },
              x: {
                position: "bottom",
                ticks: {
                  count: 7,
                },
              },
            },
          }}
        />
        {/* {lastWeek.forEach((s: Save) => console.log(s))} */}
        {/* {console.log(data.labels)} */}
      </>
    </div>
  );
}

export default Analytics;
