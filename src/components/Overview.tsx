import { parseTime } from "../utils";

export type OverviewProps = {
  delta: number;
  total: number;
};

function Overview({ delta, total }: OverviewProps) {
  return (
    <div className="overview">
      <h2 style={{ marginBottom: 15 }}> Overview </h2>
      Overall remain <strong>{parseTime(delta)}</strong>
      <progress value={delta} max={total} />
    </div>
  );
}

export default Overview;
