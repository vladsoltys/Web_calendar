export function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function createTimeList(step) {
  const MINUTES_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;
  const hours = [];

  for (let hour = 0; hour < HOURS_IN_DAY; hour++) {
    const period = hour < 12 ? "am" : "pm";

    let hourConvert = hour % 12;

    if (hourConvert === 0) {
      hourConvert = 12;
    }

    for (let minute = 0; minute < MINUTES_IN_HOUR; minute += step) {
      hours.push(
        `${String(hourConvert).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`,
      );
    }
  }

  return hours;
}

export function toMinutes(time) {
  const [clock, period] = time.split(" ");

  let [hours, minutes] = clock.split(":").map(Number);

  if (period === "pm" && hours !== 12) {
    hours += 12;
  }

  if (period === "am" && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

export function createHours() {
  const HOURS_IN_DAY = 24;
  const hours = [];

  for (let hour = 0; hour < HOURS_IN_DAY; hour++) {
    const period = hour < 12 ? "am" : "pm";

    let hourConvert = hour % 12;

    if (hourConvert === 0) {
      hourConvert = 12;
    }

    hours.push(`${String(hourConvert).padStart(2, "0")} ${period}`);
  }

  return hours;
}

export function formatDateLocal(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${y}-${m}-${day}`;
}
