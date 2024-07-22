import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Height } from "@mui/icons-material";

export const StyledSidebar = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode);
    return {
        "& .pro-sidebar-inner": {
            background: " #FFFF !important",
        // color: "#648 !important",
        },
        "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
           
        },
        "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
            color: "#0F0002 !important",
            // background: " #0F0002 !important",
        },
        "& .pro-inner-item:hover": {
            color: "#00CAFF !important",
        },
        "& .pro-menu-item.active": {
            color: "#70d8bd !important",
        },
      
    };
};
