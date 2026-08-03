import styles from "./style.module.css"
import { useState, useRef, useEffect } from "react"
import select from "../../assets/select.png"

export default function Dropdown() {

    const [time, setTime] = useState("Day");
    const [showList, setShowList] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        function handleClick(event) {
            if (!menuRef.current.contains(event.target)) {
                setShowList(false)
            }
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [showList])


    const period = [
        "Day",
        "Week"
    ]

    return (
        <div className={styles.container} ref={menuRef}>
            <button className={styles.top} onClick={() => setShowList(prev => !prev)}>
                <p className={styles.value}>{time}</p>
                <img className={showList ? styles.rotate : ""} src={select} alt="select" />
            </button>
            <ul className={showList ? `${styles.periodList} ${styles.active}` : styles.periodList}>
                {
                    period.map((item) => (
                        <li key={item} className={item === time ? `${styles.periodItem} ${styles.selected}` : styles.periodItem} onClick={() => setTime(item)}>{item}</li>
                    ))
                }
            </ul>

        </div>
    )
}