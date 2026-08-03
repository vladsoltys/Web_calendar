import styles from "./style.module.css";
import pensil from "../../assets/pensil.png";
import basket from "../../assets/basket.png";
import { useStore } from "../../store/states";

export default function Modal({ title, children = [], isOpen, onClose, onClickEdit, onClickDelete }) {
  if (!isOpen) return null;
  const modalInfoEvent = useStore((state) => state.modalInfoEvent);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <div className={styles.buttons}>
            {modalInfoEvent && (
              <img src={pensil} alt="pensil" onClick={() => onClickEdit()} />
            )}
            {modalInfoEvent && (
              <img src={basket} alt="basket" onClick={() => onClickDelete()} />
            )}
            <button onClick={onClose}>✕</button>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
