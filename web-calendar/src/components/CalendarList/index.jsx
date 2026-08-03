import { useState } from "react";
import styles from "./style.module.css";
import CheckBox from "../Checkbox";
import { useStore } from "../../store/states";
import basket from "../../assets/basket.png";
import pensil from "../../assets/pensil.png";

export default function CalendarList({
  onClickAdd,
  onClickEdit,
  onClickDelete,
}) {
  const calendars = useStore((state) => state.calendars);
  const addCalendars = useStore((state) => state.addCalendars);
  const toggleCalendar = useStore((state) => state.toggleCalendar);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>My calendars</h2>
        <button className={styles.addButton} onClick={onClickAdd}>
          +
        </button>
      </div>

      <div className={styles.list}>
        {calendars.map((calendar) => (
          <div className={styles.item} key={calendar.id}>
            <div className={styles.calendarName}>
              <CheckBox
                checked={calendar.active}
                onChange={() => toggleCalendar(calendar.id)}
                label={calendar.label}
                color={calendar.color}
              />
              <p className={styles.label}>{calendar.label}</p>
            </div>
            <div className={styles.buttons}>
              {calendars.length > 1 && (
                <button
                  className={styles.button}
                  onClick={() => onClickDelete(calendar)}
                >
                  <img src={basket} alt="basket" />
                </button>
              )}

              <button
                className={styles.button}
                onClick={() => onClickEdit(calendar)}
              >
                <img src={pensil} alt="pensil" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
