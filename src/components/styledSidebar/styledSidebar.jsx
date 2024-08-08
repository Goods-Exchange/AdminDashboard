import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Height } from "@mui/icons-material";

export const StyledSidebar = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode);
    return {
        "& .pro-sidebar-inner": {
            background: `${colors.primary[500]} !important`,
   
            
        },
        "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
            // color: "#70d8bd !important",
            color: "rgb(51, 102, 255) !important",
        },
        "& .pro-menu-item.active": {
            // color: "#70d8bd !important",
            color: "rgb(51, 102, 255) !important",
        },
    };
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// import { Height } from "@mui/icons-material";

// export const StyledSidebar = () => {
//     const theme = useTheme();

//     const colors = tokens(theme.palette.mode);
//     return {
//         "& .pro-sidebar-inner": {
//             background: `${colors.primary[500]} !important`,
//             border: "1px solid black", // Viền đen cho toàn bộ sidebar
//             borderRadius: "10px", // Bo tròn góc cho toàn bộ sidebar
//             // Thêm hiệu ứng phát sáng cho viền
//             boxShadow: "0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 0, 0, 0.5)",
           

            
//         },
//         "& .pro-icon-wrapper": {
//             backgroundColor: "transparent !important",
//         },
//         "& .pro-inner-item": {
//             padding: "5px 35px 5px 20px !important",
        
//         },
//         "& .pro-inner-item:hover": {
//             color: "rgb(51, 102, 255) !important",
//             backgroundColor: "#DBE9F4 !important", // Màu nền xám nhạt
//             borderRadius: "10px !important",
            
//         },
//         "& .pro-menu-item.active": {
//             color: "rgb(51, 102, 255) !important",
//         },
//     };
// };
