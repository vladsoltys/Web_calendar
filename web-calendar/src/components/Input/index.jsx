import styles from "./style.module.css";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import { useState } from "react";
import classNames from 'classnames';

export default function Input({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);

  function getInputType() {
    if (type !== "password") return type;
    if (disabled) return "password";

    return showPassword ? "text" : "password";
  }

  const typeCondition = getInputType();

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputField}>
        <input
          className={classNames(styles.input, {[styles.inactive]: disabled, [styles.inputError]: error})}
          id={id}
          type={typeCondition}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {type === "password" && (
          <img
            className={styles.img}
            src={!disabled ? (showPassword ? show : hide) : hide}
            alt="show/hide"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
