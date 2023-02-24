import { parseTime } from "../utils";

export type OverviewProps = {
  delta: number;
  total: number;
};

function Overview({ delta, total }: OverviewProps) {
  console.log(delta, total);
  return (
    <div className="overview">
      <h2 style={{ marginBottom: 15 }}> Overview </h2>
      Overall completion <strong>{Math.round((delta / total) * 100)} %</strong>
      <progress value={delta} max={total} />
    </div>
  );
}

export default Overview;
