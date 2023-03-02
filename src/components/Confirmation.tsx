import { useState } from "react";
import "./Focus.css";

function Confirmation({
  title,
  body,
  type,
  callback,
  children,
}: {
  title: string;
  body: string;
  type?: string;
  callback: any;
  children?: any;
}) {
  const [modal, setModal] = useState(false);

  function handleFormCancel() {
    setModal(!modal);
  }

  return (
    <>
      <button
        className={type || "action-button"}
        onClick={() => setModal(!modal)}
      >
        {children}
      </button>
      <dialog open={modal}>
        <article className="modal">
          <h1>{title}</h1>
          <body>{body}</body>
          <footer style={{ display: "flex" }}>
            <button role="button" onClick={handleFormCancel}>
              Cancel
            </button>
            <button
              role="button"
              className="secondary"
              onClick={() => {
                callback();
                setModal(false);
              }}
            >
              Confirm
            </button>
          </footer>
        </article>
      </dialog>
    </>
  );
}

export default Confirmation;
