import { useReducer, useState } from "react";
import { TimerType } from "../types";

const range = (start: number = 0, stop: number = 31, step = 5) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

function Add({ addTimer }: { addTimer: any }) {
  const [modal, setModal] = useState(false);

  const initialValues = {
    name: "",
    seconds: 0,
    minutes: 0,
    hour: 0,
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      default:
        return { ...state, ...action };
    }
  }
  const [formValues, setFormValues] = useReducer(reducer, initialValues);

  const { name, seconds, minutes, hour } = formValues;

  function handleFormChange(event: any) {
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  }

  function handleFormSubmit(event: any) {
    setModal(!modal);
    const params: TimerType = {
      name,
      delta: Number(hour) * 3600 + Number(minutes) * 60 + Number(seconds),
      total: Number(hour) * 3600 + Number(minutes) * 60 + Number(seconds),
    };
    console.log(params);
    addTimer(params);
    setFormValues(initialValues);
  }
  function handleFormCancel(event: any) {
    setFormValues(initialValues);
    setModal(!modal);
  }

  return (
    <>
      <button className="add" onClick={() => setModal(true)}>
        Add
      </button>
      <dialog open={modal}>
        <article className="modal">
          <label>
            Activity
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </label>
          <div className="inline">
            <label>
              Hour
              <select name="hour" value={hour} onChange={handleFormChange}>
                {range(0, 23).map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
            <label>
              Minutes
              <select
                name="minutes"
                value={minutes}
                onChange={handleFormChange}
              >
                {range().map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
            <label>
              Seconds
              <select
                name="seconds"
                value={seconds}
                onChange={handleFormChange}
              >
                {range().map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
          </div>
          <footer style={{ display: "flex" }}>
            <button
              role="button"
              className="secondary"
              onClick={handleFormCancel}
            >
              Cancel
            </button>
            <button
              role="button"
              data-target="modal-example"
              onClick={handleFormSubmit}
              //   to do add disable state
              disabled={
                name === "" || (hour === 0 && minutes === 0 && seconds === 0)
              }
            >
              Confirm
            </button>
          </footer>
        </article>
      </dialog>
    </>
  );
}

export default Add;
