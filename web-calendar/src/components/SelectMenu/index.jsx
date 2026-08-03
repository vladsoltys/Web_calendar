import styles from "./style.module.css";
import { useState } from "react";
import classNames from "classnames";
import { createTimeList } from "../../utils/functions";
import { useStore } from "../../store/states";

export default function SelectMenu({
  children,
  title = "Time",
  childrenMode,
  width,
  value,
  onChange,
}) {
  const [showList, setShowList] = useState(false);
  const calendars = useStore((state) => state.calendars);
  const selectedDate = useStore((state) => state.selectedDate);

  const selectedEventCalendar = useStore(
    (state) => state.selectedEventCalendar,
  );
  const setSelectedEventCalendar = useStore(
    (state) => state.setSelectedEventCalendar,
  );

  const hours = createTimeList(15);

  return (
    <>
      {showList && (
        <div
          className={styles.overlay}
          onClick={() => setShowList(false)}
        ></div>
      )}
      <div className={styles.container} style={{ "--select-width": width }}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.dropDown}>
          <button
            className={styles.top}
            onClick={() => setShowList((prev) => !prev)}
          >
            {childrenMode === "calendar" && (
              <div
                className={styles.calendarIcon}
                style={{ "--background-color": selectedEventCalendar?.color }}
              ></div>
            )}
            <p className={styles.value}>
              {childrenMode === "date"
                ? value.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : childrenMode === "calendar"
                  ? selectedEventCalendar?.label
                  : value}
            </p>
          </button>
          {childrenMode === "date" ? (
            <div
              className={
                showList
                  ? `${styles.dropDownItem} ${styles.active}`
                  : styles.dropDownItem
              }
            >
              {children}
            </div>
          ) : childrenMode === "calendar" ? (
            <ul
              className={classNames(styles.calendarList, {
                [styles.active]: showList,
              })}
            >
              {calendars.map((calendar) => (
                <li
                  key={calendar.id}
                  className={classNames(styles.calendarItem, {
                    [styles.selected]:
                      calendar.id === selectedEventCalendar?.id,
                  })}
                  style={{ "--background-color": calendar.color }}
                  onClick={() => {
                    setSelectedEventCalendar(calendar);
                    setShowList(false);
                  }}
                >
                  <p>{calendar.label}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ul
              className={classNames(styles.hoursList, {
                [styles.active]: showList,
              })}
            >
              {hours.map((item) => (
                <li
                  key={item}
                  className={classNames(styles.hoursItem, {
                    [styles.selected]: item === value,
                  })}
                  onClick={() => {
                    onChange(item);
                    setShowList(false);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
