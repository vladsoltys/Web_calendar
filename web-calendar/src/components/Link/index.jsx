import styles from "./style.module.css";
import classNames from 'classnames';

export default function Link({
    children,
    href = "#",
    disabled = false,
}) {
    return (
        <a
            href={disabled ? undefined : href}
            className={classNames(styles.link, { [styles.disabled]: disabled })}
        >
            {children}
        </a>
    );
}