import styles from "./style.module.css";
import { useStore } from "../../store/states";
import { hexToRgba } from "../../utils/functions";
import { toMinutes } from "../../utils/functions";

export default function Event({ event, onClick }) {
  const HOUR_HEIGHT = 81;
  const PIXELS_PER_MINUTE = HOUR_HEIGHT / 60;
  const CALENDAR_START = "12:00 am";
  const PADDING_TOP = 23

  const top =
    (toMinutes(event.start) - toMinutes(CALENDAR_START)) * PIXELS_PER_MINUTE + PADDING_TOP;

  const height =
    (toMinutes(event.end) - toMinutes(event.start)) * PIXELS_PER_MINUTE;

  return (
    <div
      key={event.id}
      className={styles.container}
      style={{ height, top, backgroundColor: hexToRgba(event.color, 0.5) }}
      onClick={onClick}
    >
      <div className={styles.eventInfo}>
        <h2>{event.title}</h2>
        <p>
          {event.start} - {event.end}
        </p>
      </div>
    </div>
  );
}
