// import "./landingPage.css";
// import { Button, Grid } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import GoodEx from "../../../assets/EXG.png";
// import GoodExLogo from "../../../assets/logo.png";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import XIcon from "@mui/icons-material/X";
// import { useEffect } from "react";
// import FAQ from "./FAQ/FAQ";
// import PRE from "./PREMIUM/PREMIUM";
// import FOOTER from "./FOOTER/Footer";
// export default function LandingPage() {
//   const navigate = useNavigate();
//   const url = new URL(window.location.href);
//   const direction = url.searchParams.get("direction");
//   const transactionId = url.searchParams.get("status");
//   const responseCode = url.searchParams.get("vnp_ResponseCode");
//   const status = url.searchParams.get("vnp_TransactionStatus");

//   useEffect(() => {
//     if (direction === "transferStatus") {
//       navigate("/transferStatus", {
//         state: {
//           transactionId: transactionId,
//           responseCode: responseCode,
//           status: status,
//         },
//       });
//     }
//   }, [direction]);

//   const MenuItem = ({ text }) => (
//     <Grid item xs={12 / 3}>
//       <Link className="body_mid_box" to="/login">
//         <img src={GoodEx} alt="" className="body_mid_img" />
//         <p className="body_mid_text">{text}</p>
//       </Link>
//     </Grid>
//   );

//   return (
//     <div className="landingPage">
//       <div className="header">
//         <Button
//           variant="contained"
//           onClick={() => navigate("/login")}
//           className="header_btn"
//         >
//           Đăng nhập
//         </Button>
//         <Button
//           variant="contained"
//           className="header_btn"
//           onClick={() => navigate("/signup")}
//         >
//           Đăng ký
//         </Button>
//       </div>
//       <div className="body">
//         <div className="body_top">
//           <div>
//             <p className="body_top_text">
//               Nền Tảng <br /> Trao đổi <br /> Dụng cụ FU
//             </p>
//             {/* <p className="body_top_desc">
//                             Trải nghiệm sự đa dạng của hệ thống chúng tôi ngay
//                             bây giờ
//                         </p> */}
//           </div>
//           <img src={GoodExLogo} alt="" className="body_top_img" />
//         </div>
//         <Grid container spacing={2}>
//           <MenuItem text="Đặt Chỗ" />
//           <MenuItem text="Tính năng xã hội" />
//           <MenuItem text="Bản đồ và chỉ đường" />
//         </Grid>
//       </div>
//       {/* -----------------------------------------------------------------PRE/FAQ---------------------------------------------------------- */}
//       <FAQ />
//       <PRE />
//       <FOOTER/>
//  {/* -----------------------------------------------------------------PRE/FAQ---------------------------------------------------------- */}

//     </div>
//   );
// }

// -------------------------------------------------------------------------Landing Page 2------------------------------------------------
import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AppAppBar from "../landingPage/LandingPageDetail/AppAppBar/AppAppBar";
import Hero from "../landingPage/LandingPageDetail/Hero/Hero";

import LogoCollection from "../landingPage/LandingPageDetail/LogoCollection/LogoCollection";
import Highlights from "../landingPage/LandingPageDetail/Highlights/Highlights";
import Pricing from "../landingPage/LandingPageDetail/Pricing/Pricing";
import Features from "../landingPage/LandingPageDetail/Features/Features";
import Testimonials from "../landingPage/LandingPageDetail/Testimonials/Testimonials";
import FAQ from "../landingPage/LandingPageDetail/FAQ/FAQ";
import Footer from "../landingPage/LandingPageDetail/Footer/Footer";
import CarouselProducts from "../landingPage/LandingPageDetail/CarouselProduct/CarouselProduct";
import getLPTheme from "./getLPTheme";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      {/* <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup> */}
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />

      <Box sx={{ bgcolor: "background.default" }}>
        {/* <LogoCollection /> */}

        <Features />
        <CarouselProducts />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
