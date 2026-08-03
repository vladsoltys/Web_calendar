import { create } from "zustand";

export const useStore = create((set) => ({
  isVisible: true,
  selectedColor: "#9F2957",
  valueUser: "",
  valuePassword: "",
  textarea: "",
  textareaEvent: "",
  textareaEventDescription: "",

  selectedDate: new Date(),

  modal: null,
  modalEvent: null,
  modalInfoEvent: false,

  calendars: [
    {
      id: 1,
      label: "MyCalendar",
      color: "#F5C344",
      active: true,
      isEdit: false,
    },
  ],
  selectedCalendar: null,
  selectedEventCalendar: {
    id: 1,
    label: "MyCalendar",
    color: "#F5C344",
  },
  events: [],
  selectedEvent: null,

  setSelectedColor: (color) => set({ selectedColor: color }),
  setValueUser: (valueUser) => set({ valueUser }),
  setValuePassword: (valuePassword) => set({ valuePassword }),
  setTextarea: (textarea) => set({ textarea }),
  setTextareaEvent: (textareaEvent) => set({ textareaEvent }),
  setTextareaEventDescription: (textareaEventDescription) =>
    set({ textareaEventDescription }),

  setSelectedDate: (selectedDate) => set({ selectedDate }),

  setModal: (modal) => set({ modal }),
  setModalEvent: (modalEvent) => set({ modalEvent }),
  setModalInfoEvent: (modalInfoEvent) => set({ modalInfoEvent }),
  setIsVisible: (value) => set({ isVisible: value }),
  addCalendar: (calendar) =>
    set((state) => ({
      calendars: [...state.calendars, calendar],
    })),
  toggleCalendar: (id) =>
    set((state) => ({
      calendars: state.calendars.map((calendar) =>
        calendar.id === id
          ? { ...calendar, active: !calendar.active }
          : calendar,
      ),
    })),
  setSelectedCalendar: (calendar) => set({ selectedCalendar: calendar }),
  setSelectedEventCalendar: (calendar) =>
    set({ selectedEventCalendar: calendar }),
  updateCalendar: (id, data) =>
    set((state) => ({
      calendars: state.calendars.map((calendar) =>
        calendar.id === id ? { ...calendar, ...data } : calendar,
      ),

      events: state.events.map((event) =>
        event.calendarId === id
          ? {
              ...event,
              calendar: data.label,
              color: data.color,
            }
          : event,
      ),
    })),
  deleteCalendar: (id) =>
    set((state) => ({
      calendars: state.calendars.filter((calendar) => calendar.id !== id),
    })),

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),
  updateEvent: (id, data) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...data } : event,
      ),
    })),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));
