import styles from "./style.module.css"
import playWhite from "../../assets/play-white.png"
import playBlack from "../../assets/play-black.png"
import classNames from 'classnames';

export default function Button({
    children,
    colored = false,
    icon = false,
    disabled = false,
    onClick,
    src,
    width,
    height
}) {
    return (
        <button
            disabled={disabled}
            className={classNames(styles.button, colored ? styles.primary : styles.secondary)}
            style={{"--button-width": width, "--button-height": height}}
            onClick={onClick}
        >
            {icon && (
                <img
                    src={src}
                    alt="play"
                />
            )}
            {children}
        </button>
    );
}