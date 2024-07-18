import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from '@mui/icons-material/Link';

export const TypeIcon = (props) => {
    if (props.droppable) {
        return <FolderIcon />;
    }

    switch (props.type) {
        case "contents":
            return <ImageIcon />;
        case "board":
            return <ListAltIcon />;
        case "link":
            return <LinkIcon />
        default:
            return <DescriptionIcon />;
    }
};
