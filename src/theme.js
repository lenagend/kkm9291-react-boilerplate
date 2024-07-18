import { createTheme } from '@mui/material/styles';
import {Button} from "@mui/material";
import React from "react";

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "*": {
                    margin: 0,
                    padding: 0
                },
                "html, body, #root": {
                    height: "100%"
                },
                ul: {
                    listStyle: "none"
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: { verticalAlign: "middle" }
            }
        }
    }
});

export default theme;


