import React, { useState } from "react";
import dayjs from "dayjs";
import "./DaySelector.css";

function DaySelector({
  value,
  setDays,
}: {
  value: number[];
  setDays: (val: number[]) => void;
}) {
  const handleDayClick = (day: number) => {
    const index = value.indexOf(day);
    if (index === -1) {
      // if the day is not already selected, add it to the list of selected days
      setDays([...value, day]);
    } else {
      // if the day is already selected, remove it from the list of selected days
      const newSelectedDays = [...value];
      newSelectedDays.splice(index, 1);
      setDays(newSelectedDays);
    }
    // onDaysChange(newSelectedDays); // notify parent component of the new selected days
  };

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="selection-buttons">
      {dayLabels.map((label, index) => (
        <button
          className="week-button"
          style={{
            background: value.includes(index)
              ? "var(--primary)"
              : "transparent",
          }}
          key={index}
          onClick={() => handleDayClick(index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default DaySelector;
