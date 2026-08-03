import styles from "./style.module.css";
import checkIcon from "../../assets/check.svg"

export default function Checkbox({
  checked,
  onChange,
  color = "#5f44f5",
}) {
  return (
    <label className={styles.checkbox} style={{ "--checkbox-color": color }}>
      <input type="checkbox" checked={checked} onChange={onChange} />

      <span className={styles.checkmark}>
        <img src={checkIcon} alt="checkIcon" />
      </span>
    </label>
  );
}
