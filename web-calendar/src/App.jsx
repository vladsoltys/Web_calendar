import { use, useState } from "react";
import { useStore } from "./store/states";
import { formatDateLocal } from "./utils/functions";
import styles from "./App.module.css";
import DatePicker from "./components/DatePicker";
import Toast from "./components/Toast";
import Colorpicker from "./components/Colorpicker";
import Input from "./components/Input";
import SelectMenu from "./components/SelectMenu";
import Link from "./components/Link";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Dropdown from "./components/DropDown";
import Textarea from "./components/Textarea";
import Modal from "./components/Modal";
import CalendarHead from "./components/CalendarHead";
import CalendarList from "./components/CalendarList";
import EventsTable from "./components/EventsTable";
import text from "./assets/text.png";
import colors from "./assets/colors.png";
import plusIcon from "./assets/plusIcon.png";
import clock from "./assets/clock.png";
import calendar from "./assets/calendar.png";
import pdescription from "./assets/pdescription.png";

function App() {
  const calendars = useStore((state) => state.calendars);
  const events = useStore((state) => state.events);
  const modal = useStore((state) => state.modal);
  const modalEvent = useStore((state) => state.modalEvent);
  const modalInfoEvent = useStore((state) => state.modalInfoEvent);

  const textarea = useStore((state) => state.textarea);
  const textareaEvent = useStore((state) => state.textareaEvent);
  const textareaEventDescription = useStore(
    (state) => state.textareaEventDescription,
  );
  const selectedColor = useStore((state) => state.selectedColor);
  const selectedCalendar = useStore((state) => state.selectedCalendar);
  const selectedEventCalendar = useStore(
    (state) => state.selectedEventCalendar,
  );
  const selectedEvent = useStore((state) => state.selectedEvent);
  const selectedDate = useStore((state) => state.selectedDate);

  const setModal = useStore((state) => state.setModal);
  const setModalEvent = useStore((state) => state.setModalEvent);
  const setModalInfoEvent = useStore((state) => state.setModalInfoEvent);

  const setTextarea = useStore((state) => state.setTextarea);
  const setTextareaEvent = useStore((state) => state.setTextareaEvent);
  const setTextareaEventDescription = useStore(
    (state) => state.setTextareaEventDescription,
  );
  const addCalendar = useStore((state) => state.addCalendar);
  const setSelectedColor = useStore((state) => state.setSelectedColor);
  const setSelectedCalendar = useStore((state) => state.setSelectedCalendar);
  const setSelectedEventCalendar = useStore(
    (state) => state.setSelectedEventCalendar,
  );
  const setSelectedEvent = useStore((state) => state.setSelectedEvent);
  const setSelectedDate = useStore((state) => state.setSelectedDate);

  const updateCalendar = useStore((state) => state.updateCalendar);
  const deleteCalendar = useStore((state) => state.deleteCalendar);

  const addEvent = useStore((state) => state.addEvent);
  const updateEvent = useStore((state) => state.updateEvent);
  const deleteEvent = useStore((state) => state.deleteEvent);

  const [startTime, setStartTime] = useState("12:00 am");
  const [endTime, setEndTime] = useState("01:00 am");
  const [eventDate, setEventDate] = useState(selectedDate);

  return (
    <>
      <CalendarHead />
      <main className={styles.main}>
        <aside className={styles.aside}>
          <Button
            children="Create"
            colored
            icon
            src={plusIcon}
            height={"40px"}
            onClick={() => {
              setModalEvent("create")
              setEventDate(selectedDate);
              setStartTime("12:00 am");
              setEndTime("01:00 am");
            }}
          />
          <DatePicker value={selectedDate} onChange={setSelectedDate} />
          <CalendarList
            onClickAdd={() => setModal("create")}
            onClickEdit={(calendar) => {
              setSelectedCalendar(calendar);
              setTextarea(calendar.label);
              setSelectedColor(calendar.color);
              setModal("edit");
            }}
            onClickDelete={(calendar) => {
              setModal("delete");
              setSelectedCalendar(calendar);
            }}
          />
        </aside>
        <EventsTable />
      </main>
      <Modal
        title={
          modal === "create"
            ? "Create calendar"
            : modal === "edit"
              ? "Edit calendar"
              : "Delete calendar"
        }
        isOpen={modal !== null}
        onClose={() => {
          setModal(null);
          setTextarea("");
          setSelectedColor("#9F2957");
          setSelectedCalendar(null);
        }}
      >
        <div className={styles.field}>
          {modal === "delete" ? (
            <>
              <p>
                Are you sure you want to delete {selectedCalendar.label}? You'll
                no longer have access to this calendar and its events.
              </p>
              <div className={styles.deleteBtns}>
                <Button
                  children="Cancel"
                  width={"80px"}
                  onClick={() => setModal(null)}
                />
                <Button
                  children="Delete"
                  colored
                  width={"80px"}
                  onClick={() => {
                    (deleteCalendar(selectedCalendar.id), setModal(null));
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.inputField}>
                <img src={text} alt="text" />
                <Textarea
                  label="Title"
                  placeholder="Enter title"
                  value={textarea}
                  onChange={(e) => setTextarea(e.target.value)}
                />
              </div>
              <div className={styles.inputField}>
                <img src={colors} alt="text" />
                <Colorpicker />
              </div>
              <Button
                children="Save"
                colored
                disabled={!textarea.trim()}
                onClick={() => {
                  if (!textarea.trim()) return;

                  if (modal === "create") {
                    addCalendar({
                      id: Date.now(),
                      label: textarea,
                      color: selectedColor,
                      active: false,
                      isEdit: false,
                    });
                  }

                  if (modal === "edit") {
                    updateCalendar(selectedCalendar.id, {
                      label: textarea,
                      color: selectedColor,
                    });
                  }

                  setModal(null);
                  setTextarea("");
                  setSelectedColor("#9F2957");
                  setSelectedCalendar(null);
                }}
                width={"80px"}
              />
            </>
          )}
        </div>
      </Modal>
      <Modal
        title={
          modalEvent === "create"
            ? "Create event"
            : modalEvent === "edit"
              ? "Edit event"
              : "Delete event"
        }
        isOpen={modalEvent !== null}
        onClose={() => {
          setModalEvent(null);
          setTextareaEvent("");
          setTextareaEventDescription("");
        }}
      >
        <div className={styles.field}>
          {modalEvent === "delete" ? (
            <>
              <p>
                Are you sure you want to delete {selectedEvent?.title}? You'll
                no longer have access to it.
              </p>
              <div className={styles.deleteBtns}>
                <Button
                  children="Cancel"
                  width={"80px"}
                  onClick={() => setModalEvent(null)}
                />
                <Button
                  children="Delete"
                  colored
                  width={"80px"}
                  onClick={() => {
                    setModalEvent(null);
                    deleteEvent(selectedEvent.id);
                    setSelectedEvent(null);
                    setTextareaEvent("");
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.inputField}>
                <img src={text} alt="text" />
                <Textarea
                  label="Title"
                  placeholder="Enter title"
                  value={textareaEvent}
                  onChange={(e) => setTextareaEvent(e.target.value)}
                />
              </div>
              <div className={styles.inputField}>
                <img src={clock} alt="clock" />
                <div className={styles.timeSelect}>
                  <SelectMenu
                    title="Date"
                    children={
                      <DatePicker value={eventDate} onChange={setEventDate} />
                    }
                    childrenMode="date"
                    value={eventDate}
                  />
                  <SelectMenu value={startTime} onChange={setStartTime} />
                  <span>-</span>
                  <SelectMenu title="" value={endTime} onChange={setEndTime} />
                </div>
              </div>
              <div className={styles.inputField}>
                <img src={calendar} alt="calendar" />
                <SelectMenu
                  title="Calendar"
                  width={"100%"}
                  childrenMode="calendar"
                />
              </div>
              <div className={styles.inputField}>
                <img src={pdescription} alt="text" />
                <Textarea
                  label="Description"
                  placeholder="Enter description"
                  value={textareaEventDescription}
                  onChange={(e) => setTextareaEventDescription(e.target.value)}
                />
              </div>
              <Button
                children="Save"
                colored
                disabled={!textareaEvent.trim()}
                onClick={() => {
                  if (!textareaEvent.trim()) return;

                  if (modalEvent === "create") {
                    addEvent({
                      id: Date.now(),
                      title: textareaEvent,
                      start: startTime,
                      end: endTime,
                      date: formatDateLocal(eventDate),
                      description: textareaEventDescription,
                      calendar: selectedEventCalendar.label,
                      calendarId: selectedEventCalendar.id,
                      color: selectedEventCalendar.color,
                    });
                  }

                  if (modalEvent === "edit") {
                    updateEvent(selectedEvent.id, {
                      title: textareaEvent,
                      start: startTime,
                      end: endTime,
                      date: formatDateLocal(eventDate),
                      description: textareaEventDescription,
                      calendar: selectedEventCalendar.label,
                      calendarId: selectedEventCalendar.id,
                      color: selectedEventCalendar.color,
                    });
                  }

                  setModalEvent(null);
                  setTextareaEvent("");
                }}
                width={"80px"}
              />
            </>
          )}
        </div>
      </Modal>
      <Modal
        title="Event Information"
        isOpen={!!modalInfoEvent}
        onClose={() => setModalInfoEvent(false)}
        onClickEdit={() => {
          setModalEvent("edit");
          setModalInfoEvent(false);
        }}
        onClickDelete={() => {
          setModalEvent("delete");
          setModalInfoEvent(false);
        }}
      >
        <div className={styles.field}>
          <div className={styles.inputField}>
            <img src={text} alt="text" />
            <p className={styles.titleValue}>{selectedEvent?.title}</p>
          </div>

          <div className={styles.inputField}>
            <img src={clock} alt="clock" />
            <p>
              {new Date(selectedEvent?.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}, {selectedEvent?.start} - {selectedEvent?.end}
            </p>
          </div>

          <div className={styles.inputField}>
            <img src={calendar} alt="calendar" />
            <p
              className={styles.calendarName}
              style={{
                "--background-color": selectedEvent?.color,
              }}
            >
              {selectedEvent?.calendar}
            </p>
          </div>

          <div className={styles.inputField}>
            <img src={pdescription} alt="description" />
            <p>
              {selectedEvent?.description
                ? selectedEvent?.description
                : "No description provided."}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
