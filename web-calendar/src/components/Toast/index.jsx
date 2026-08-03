import { useState, useEffect } from "react"
import styles from "./style.module.css"
import x from "../../assets/x.png"
import { useStore } from "../../store/states"
import classNames from 'classnames';

export default function Toast({ text = "Event deleted" }) {

    const isVisible = useStore((state) => state.isVisible);
    const setIsVisible = useStore((state) => state.setIsVisible)

    useEffect(() => {
        if (!isVisible) return;

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);

    }, [isVisible])

    return (
        <div className={classNames(styles.container, {[styles.active]: isVisible})}>
            <h2 className={styles.text}>{text}</h2>
            <img className={styles.toastImg} src={x} alt="x" onClick={() => setIsVisible(false)}/>
        </div>

    )
}