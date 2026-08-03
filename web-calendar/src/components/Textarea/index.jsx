import styles from "./style.module.css";

export default function Textarea({
  id,
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputField}>
        <textarea rows="1"
          className={styles.textarea}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
