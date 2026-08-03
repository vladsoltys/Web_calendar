export const CALENDAR_WEEKS = 6;
export const DAYS_IN_WEEK = 7;
export const CALENDAR_CELLS = CALENDAR_WEEKS * DAYS_IN_WEEK;

function createDaysArr(arr, year, month, start, end, currentMonth) {
  for (let day = start; day <= end; day++) {
    arr.push({
      date: new Date(year, month, day),
      day,
      currentMonth,
    });
  }
}

export function getCalendarDays(year, month) {
  const days = [];

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const firstWeekDay = firstDay === 0 ? 6 : firstDay - 1;

  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const startPrevMonth = daysInPrevMonth - firstWeekDay;

  createDaysArr(days, year, month - 1, startPrevMonth, daysInPrevMonth, false);

  createDaysArr(days, year, month, 1, daysInMonth, true);

  const remainingDays = CALENDAR_CELLS - days.length;

  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      date: new Date(year, month + 1, day),
      day,
      currentMonth: false,
    });
  }

  return days;
}