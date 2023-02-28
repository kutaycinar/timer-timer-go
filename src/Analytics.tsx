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
import {
  calculateAverageCompletion,
  calculateTotalCompletions,
} from "./analyticsUtils";
import { Save } from "./types";
import "./Analytics.css";
import "react-calendar-heatmap/dist/styles.css";
import Heatmap from "./components/Analytics/Heatmap";
import Summary from "./components/Analytics/Summary";

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
      <Summary data={saves} />
      <Heatmap data={saves} />
    </div>
  );
}

export default Analytics;
