import { useEffect, useReducer, useState } from "react";
import { State, TimerType } from "../types";
import { getHours, getMinutes, getSeconds } from "../utils";
import DaySelector from "./DaySelector";

const range = (start: number = 0, stop: number = 31, step = 5) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step)

function Add({
  setHook,
  children,
  initialValues = {
    name: "",
    seconds: 0,
    minutes: 0,
    hour: 0,
    goal: 1,
    delta: 0,
    counter: false,
    color: "#1bb3e6",
    days: [0, 1, 2, 3, 4, 5, 6],
  },
  reset = false,
  timers,
}: {
  setHook: any
  children: any
  initialValues?: any
  reset?: boolean
  timers?: TimerType[]
}) {
  const [modal, setModal] = useState(false)

  function reducer(state: State, action: any) {
    switch (action.type) {
      default:
        return { ...state, ...action }
    }
  }
  const [formValues, setFormValues] = useReducer(reducer, initialValues)

  const [counter, setCounter] = useState(initialValues.counter)
  const [selectedDays, setSelectedDays] = useState(initialValues.days)

  const { name, delta, seconds, minutes, hour, goal, color } = formValues

  function handleFormChange(event: any) {
    const { name, value } = event.target
    setFormValues({ [name]: value })
  }

  function handleFormSubmit() {
    setModal(!modal)
    const params: TimerType = {
      name:
        name.trim().charAt(0).toUpperCase() +
        name.trim().slice(1).toLowerCase(),
      delta,
      total: !counter
        ? Number(hour) * 3600 + Number(minutes) * 60 + Number(seconds)
        : goal,
      counter,
      color,
      days: selectedDays,
    }
    console.log(params)
    setHook(params)
    if (reset) setFormValues(initialValues)
  }
  function handleFormCancel() {
    setModal(!modal)
    setFormValues(initialValues)
  }

  return (
    <>
      <a
        onClick={() => {
          setModal(true)
          setFormValues(initialValues)
        }}
      >
        {children}
      </a>
      <dialog open={modal}>
        <article className='modal'>
          <label>
            Activity
            <input
              type='text'
              name='name'
              placeholder="Activity name like Running, Reading..."
              value={name}
              onChange={handleFormChange}
              autoComplete='nope'
            />
          </label>
          <label>
            Color
            <input
              type='color'
              onChange={handleFormChange}
              name='color'
              value={color}
            />
          </label>
          <div className='inline'>
            Type:
            <button
              className={counter ? "secondary" : ""}
              onClick={() => setCounter(!counter)}
            >
              Timer
            </button>
            <button
              className={!counter ? "secondary" : ""}
              onClick={() => setCounter(!counter)}
            >
              Counter
            </button>
          </div>
          <DaySelector value={selectedDays} setDays={setSelectedDays} />
          <div style={{ height: 98 }}>
            {!counter ? (
              <div className='inline'>
                <label>
                  Hour
                  <select name='hour' value={hour} onChange={handleFormChange}>
                    {range(0, 10, 1).map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Minutes
                  <select
                    name='minutes'
                    value={minutes}
                    onChange={handleFormChange}
                  >
                    {range(0, 60, 1).map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Seconds
                  <select
                    name='seconds'
                    value={seconds}
                    onChange={handleFormChange}
                  >
                    {range(0, 60, 1).map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
              </div>
            ) : (
              <div>
                <label>
                  Goal
                  <select name='goal' value={goal} onChange={handleFormChange}>
                    {range(1, 13, 1).map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            <br />
          </div>
          <footer style={{ display: "flex" }}>
            <button
              role='button'
              className='secondary'
              onClick={handleFormCancel}
            >
              Cancel
            </button>
            <button
              role='button'
              data-target='modal-example'
              onClick={handleFormSubmit}
              disabled={
                name.trim() === "" ||
                (counter ? false : hour + minutes + seconds <= 0) ||
                (timers &&
                  timers.some(
                    (timer) => timer.name.toLowerCase() === name.toLowerCase()
                  )) ||
                selectedDays.length < 1
              }
            >
              Confirm
            </button>
          </footer>
        </article>
      </dialog>
    </>
  )
}

export default Add
