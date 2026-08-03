import { useState } from "react";
import styles from "./style.module.css";
import { colors } from "../../store/colors";
import { useStore } from "../../store/states";
import classNames from 'classnames';

export default function Colorpicker() {
  const selectedColor = useStore((state) => state.selectedColor);
  const setSelectedColor = useStore((state) => state.setSelectedColor);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Color</h2>
      <div className={styles.colorsContainer}>
        <div className={styles.colorsGrid}>
          {colors.map((item, index) => (
            <button
              key={index}
              className={classNames(styles.colorCell, {[styles.active]: selectedColor === item.color})}
              style={{ backgroundColor: item.color }}
              onClick={() => setSelectedColor(item.color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
