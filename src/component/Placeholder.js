import React from "react";
import styles from "/styles/Placeholder.module.css"

export const Placeholder = (props) => {
    const left = props.depth * 24;
    return <div className={styles.root} style={{ left }}></div>;
};
