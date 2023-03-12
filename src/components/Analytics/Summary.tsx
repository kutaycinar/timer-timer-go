import dayjs from "dayjs"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import { Save } from "../../types"

function Summary({ data }: { data: Save[] }) {
  const today = dayjs()
  let lastWeek: Save[] = []
  for (let i = 7; i >= 1; i--) {
    const date = today.subtract(i, "days")
    const save = data.find((s: Save) => dayjs(s.date).isSame(date, "day"))
    if (save) {
      lastWeek.push(save)
    } else {
      lastWeek.push({
        completion: 0,
        date: date.valueOf(),
        timers: [],
      })
    }
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        marginBottom: "10px",
        height: "auto",
      }}
    >
      {lastWeek.map((save: Save, idx: number) => (
        <CircularProgressbarWithChildren value={save.completion} key={idx}>
          <div className="week-title">
            {dayjs(save.date).format("ddd")}
          </div>
        </CircularProgressbarWithChildren>
      ))}
    </div>
  )
}

export default Summary
