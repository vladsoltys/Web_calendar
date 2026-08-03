import { useState } from "react";
import styles from "./style.module.css";
import prev from "../../assets/prev.png";
import next from "../../assets/next.png";
import classNames from "classnames";
import { useStore } from "../../store/states";

import { getCalendarDays } from "../../utils/calendar";

export default function DatePicker({value, onChange}) {
  const [today] = useState(() => new Date());
  const [currentDate, setCurrentDate] = useState(today);
  const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"];

  function getPrevMonth() {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  }

  function getNextMonth() {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  }

  const days = getCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const monthTitle = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.container}>
      <div className={styles.date}>
        <h2 className={styles.dateCurrent}>{monthTitle}</h2>
        <div className={styles.dateButtons}>
          <button className={styles.dateBtn} onClick={getPrevMonth}>
            <img src={prev} alt="prev" />
          </button>
          <button className={styles.dateBtn} onClick={getNextMonth}>
            <img src={next} alt="next" />
          </button>
        </div>
      </div>
      <div className={styles.days}>
        {WEEK_DAYS.map((day) => (
          <p key={day} className={styles.dayName}>
            {day}
          </p>
        ))}
      </div>
      <div className={styles.grid}>
        {days.map((item, index) => {
          const isToday =
            item.currentMonth &&
            item.day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          const isSelected =
            item.date.toDateString() === value.toDateString();

          return (
            <button
              key={index}
              onClick={() => {
                onChange(item.date);

                if (!item.currentMonth) {
                  setCurrentDate(item.date);
                }

              }}
              className={classNames(styles.dayCell, {
                [styles.otherMonth]: !item.currentMonth,
                [styles.today]: isToday,
                [styles.selected]: isSelected,
              })}
            >
              {item.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
