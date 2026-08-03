import { useStore } from "../../store/states";
import styles from "./style.module.css";
import Dropdown from "../DropDown";
import Button from "../Button";
import mainLogo from "../../assets/main-logo.png";
import avatar from "../../assets/avatar.png";
import prev from "../../assets/prev.png";
import next from "../../assets/next.png";

export default function CalendarHead() {
  const selectedDate = useStore((state) => state.selectedDate);
  const setSelectedDate = useStore((state) => state.setSelectedDate);

  const dateTitle = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={mainLogo} alt="mainLogo" />
        <Button
          children="Today"
          colored
          width={"100px"}
          onClick={() => setSelectedDate(new Date())}
        />
        <div className={styles.dateSelector}>
          <Button
            children={<img src={prev} />}
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  selectedDate.getDate() - 1,
                ),
              )
            }
          />
          <Button
            children={<img src={next} />}
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  selectedDate.getDate() + 1,
                ),
              )
            }
          />
        </div>
        <p className={styles.dateValue}>{dateTitle}</p>
      </div>
      <div className={styles.rightSide}>
        <Dropdown />
        <div className={styles.loginField}>
          <p>Username</p>
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
}
