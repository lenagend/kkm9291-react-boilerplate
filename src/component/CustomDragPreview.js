import React from "react";
import { TypeIcon } from "./TypeIcon";
import styles from "/styles/CustomDragPreview.module.css";

export const CustomDragPreview = (props) => {
    const item = props.monitorProps.item;

    return (
        <div className={styles.root}>
            <div className={styles.icon}>
                <TypeIcon droppable={item.droppable} type={item?.data?.type} />
            </div>
            <div className={styles.label}>{item.text}</div>
        </div>
    );
};
