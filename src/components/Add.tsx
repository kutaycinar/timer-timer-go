import { useReducer, useState } from "react";
import { SkuInfo } from "../iap";
import { State, TimerType } from "../types";

const range = (start: number = 0, stop: number = 31, step = 5) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

function Add({
  setHook,
  children,
  initialValues = {
    name: "",
    seconds: 0,
    minutes: 0,
    hour: 0,
    goal: 1,
    counter: false,
    color: "#1bb3e6",
  },
  reset = false,
  proInfo,
  updatePro,
}: {
  setHook: any;
  children: any;
  initialValues?: any;
  reset?: boolean;
  proInfo?: SkuInfo;
  updatePro?: () => any;
}) {
  const [modal, setModal] = useState(false);

  function reducer(state: State, action: any) {
    switch (action.type) {
      default:
        return { ...state, ...action };
    }
  }
  const [formValues, setFormValues] = useReducer(reducer, initialValues);

  const [counter, setCounter] = useState(initialValues.counter);

  const { name, seconds, minutes, hour, goal, color } = formValues;

  function handleFormChange(event: any) {
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  }

  function handleFormSubmit() {
    setModal(!modal);
    const params: TimerType = {
      name:
        name.trim().charAt(0).toUpperCase() +
        name.trim().slice(1).toLowerCase(),
      delta: !counter
        ? Number(hour) * 3600 + Number(minutes) * 60 + Number(seconds)
        : goal,
      total: !counter
        ? Number(hour) * 3600 + Number(minutes) * 60 + Number(seconds)
        : goal,
      counter,
      color,
    };
    setHook(params);
    if (reset) setFormValues(initialValues);
  }
  function handleFormCancel() {
    setModal(!modal);
    setFormValues(initialValues);
  }

  return (
    <>
      <a onClick={() => setModal(true)}>{children}</a>
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
          <label>
            Color
            <input
              type="color"
              onChange={handleFormChange}
              name="color"
              value={color}
            ></input>
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
                  Goal
                  <select name="goal" value={goal} onChange={handleFormChange}>
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
