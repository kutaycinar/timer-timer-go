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
import CalendarHeatmap from "react-calendar-heatmap";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import {
  calculateAverageCompletion,
  calculateTotalCompletions,
} from "./analyticsUtils";
import { Save } from "./types";
import "./Analytics.css";
import "react-calendar-heatmap/dist/styles.css";

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
  const lastThreeMonths = saves.filter((save: Save) => {
    return Math.abs(dayjs().diff(dayjs(save.date), "months")) <= 3;
  });

  const data = {
    labels: lastWeek.map((s: Save) => {
      return dayjs(s.date).format("DD ddd");
    }),
    datasets: [
      {
        label: "Week Summary",
        data: lastWeek.map((s: Save) => s.completion),
        borderWidth: 1,
        backgroundColor: "rgba(0, 99, 132, 1)",
      },
    ],
  };

  return (
    <div style={{ padding: "15px" }}>
      <h1>Analytics</h1>
      <div style={{ display: "flex" }}>
        <h2 className="stat-container">
          LifeTime Average
          <br />
          {calculateAverageCompletion(saves) + "%"}
        </h2>
        <h2 className="stat-container">
          Total Completions
          <br />
          {calculateTotalCompletions(saves)}
        </h2>
      </div>
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
      <CalendarHeatmap
        showWeekdayLabels
        gutterSize={2.5}
        startDate={dayjs().subtract(3, "months").toDate()}
        endDate={dayjs().toDate()}
        values={lastThreeMonths.map((save: Save) => {
          return {
            date: dayjs(save.date).format("YYYY-MM-DD"),
            count: save.completion,
          };
        })}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          console.log(Math.round(value.count / 25));

          return `color-scale-${Math.round(value.count / 25)}`;
        }}
      />
    </div>
  );
}

export default Analytics;
