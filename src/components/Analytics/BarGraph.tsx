import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import { Save } from "../../types";

function BarGraph({ saves }: { saves: Save[] }) {
  const data = {
    labels: saves.map((s: Save) => {
      return dayjs(s.date).format("DD ddd");
    }),
    datasets: [
      {
        label: "Week Summary",
        data: saves.map((s: Save) => s.completion),
        borderWidth: 1,
        backgroundColor: "rgba(0, 99, 132, 1)",
      },
    ],
  };
  return (
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
  );
}

export default BarGraph;
