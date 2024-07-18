import React from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TypeIcon } from "./TypeIcon";
import styles from "/styles/CustomNode.module.css";
import {useDragOver} from "@minoru/react-dnd-treeview";

export const CustomNode = (props) => {
    const { node, depth, isOpen, onToggle, onSelect } = props;
    const { droppable, data } = node;
    const indent = depth * 24;

    const handleToggle = (e) => {
        e.stopPropagation();
        onToggle(node.id);
    };

    const handleClick = (e) => {
        e.stopPropagation();
        onSelect(node);
    };

    const dragOverProps = useDragOver(props.node.id, props.isOpen, props.onToggle);


    return (
        <div
            className={`tree-node ${styles.root} ${
                props.isSelected ? styles.isSelected : ""
            }`}
            style={{ paddingInlineStart: indent }}
            {...dragOverProps}
            onClick={handleClick}
        >
            <div
                className={`${styles.expandIconWrapper} ${
                    isOpen ? styles.isOpen : ""
                }`}
            >
                {droppable && (
                    <div onClick={handleToggle}>
                        <ArrowRightIcon />
                    </div>
                )}
            </div>
            <div>
                <TypeIcon droppable={droppable} type={data?.type} />
            </div>
            <div className={styles.labelGridItem}>
                <Typography variant="body2">{node.text}</Typography>
            </div>
        </div>
    );
};
