import styles from "./style.module.css";
import { useStore } from "../../store/states";
import Event from "../Event";
import { createHours, formatDateLocal } from "../../utils/functions";

export default function EventsTable() {
  const events = useStore((state) => state.events);

  const calendars = useStore((state) => state.calendars);

  const modalInfoEvent = useStore((state) => state.modalInfoEvent);
  const setModalInfoEvent = useStore((state) => state.setModalInfoEvent);

  const selectedEvent = useStore((state) => state.selectedEvent);
  const setSelectedEvent = useStore((state) => state.setSelectedEvent);
  const setTextareaEvent = useStore((state) => state.setTextareaEvent);

  const selectedDate = useStore((state) => state.selectedDate);

  const hours = createHours();

  const currentDate = formatDateLocal(selectedDate);

  const visibleEvents = events.filter((event) => {
    const calendar = calendars.find((item) => item.id === event.calendarId);

    return event.date === formatDateLocal(selectedDate) && calendar?.active;
  });

  return (
    <section className={styles.eventsTable}>
      <div className={styles.eventsHead}>
        <div className={styles.eventsHeadLeft}></div>
        <div className={styles.eventsHeadRight}>
          <div className={styles.selectedDate}>
            <h2>{selectedDate.getDate()}</h2>
            <p>
              {selectedDate.toLocaleDateString("en-US", { weekday: "short" })}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.eventsField}>
        <div className={styles.hoursColumn}>
          {hours.map((hour) => (
            <div key={hour} className={styles.hour}>
              {hour}
            </div>
          ))}
        </div>
        <div className={styles.grid}>
          {hours.map((hour) => (
            <div key={hour} className={styles.cell} />
          ))}

          {visibleEvents.map((event) => (
            <Event
              key={event.id}
              event={event}
              onClick={() => {
                setModalInfoEvent(event);
                setSelectedEvent(event);
                setTextareaEvent(event.title);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
