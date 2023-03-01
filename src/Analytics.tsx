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
import {
  calculateAverageCompletion,
  calculateTotalCompletions,
} from "./analyticsUtils";
import { Save } from "./types";
import "./Analytics.css";
import "react-calendar-heatmap/dist/styles.css";
import Heatmap from "./components/Analytics/Heatmap";
import Summary from "./components/Analytics/Summary";
import Card from "./components/Analytics/Card";

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
    <div
      style={{
        padding: "15px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "73vh",
        overflow: "hidden",
      }}
    >
      <Card>
        <div className="stat-container">
          <h2 className="stat">{calculateAverageCompletion(saves) + "%"}</h2>
          <h4 className="stat">Average</h4>
        </div>
      </Card>
      <Card>
        <div className="stat-container">
          <h2 className="stat">{calculateTotalCompletions(saves)}</h2>
          <h4 className="stat">Completions</h4>
        </div>
      </Card>
      <Card title="Last Week" span2>
        <Summary data={saves} />
      </Card>
      <Card title="Summary" span2>
        <Heatmap data={saves} />
      </Card>
    </div>
  );
}

export default Analytics;
