import { useReducer, useState } from "react";
import { State, TimerType } from "../types";

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
    limit: 1,
    reverse: false,
  };

  function reducer(state: State, action: any) {
    switch (action.type) {
      default:
        return { ...state, ...action };
    }
  }
  const [formValues, setFormValues] = useReducer(reducer, initialValues);

  const [counter, setCounter] = useState(false);

  const { name, seconds, minutes, hour, limit, reverse } = formValues;

  function handleFormChange(event: any) {
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  }

  function handleFormSubmit() {
    setModal(!modal);
    const params: TimerType = {
      name,
      delta: !counter
        ? Number(hour) * 3600 + Number(minutes) * 60 + Number(seconds)
        : limit,
      total: !counter
        ? Number(hour) * 3600 + Number(minutes) * 60 + Number(seconds)
        : limit,
      counter,
      reverse,
    };
    addTimer(params);
    setFormValues(initialValues);
  }
  function handleFormCancel() {
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
          <div style={{ height: 98 }}>
            {!counter ? (
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
            ) : (
              <div>
                <label>
                  Limit
                  <select
                    name="limit"
                    value={limit}
                    onChange={handleFormChange}
                  >
                    {range(1, 9, 1).map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            <label htmlFor="switch">
              Count Down
              <input
                style={{ marginLeft: 8, marginRight: 8 }}
                type="checkbox"
                name="reverse"
                role="switch"
                onChange={handleFormChange}
              />
              Count Up
            </label>
            <br />
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
                name.trim() === "" ||
                (counter ? false : hour + minutes + seconds <= 0)
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
