import "./landingPage.css";
import { Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoodEx from "../../../assets/EXG.png";
import GoodExLogo from "../../../assets/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import { useEffect } from "react";
import FAQ from "./FAQ/FAQ";
import PRE from "./PREMIUM/PREMIUM";
import FOOTER from "./FOOTER/Footer";
export default function LandingPage() {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const direction = url.searchParams.get("direction");
  const transactionId = url.searchParams.get("status");
  const responseCode = url.searchParams.get("vnp_ResponseCode");
  const status = url.searchParams.get("vnp_TransactionStatus");

  useEffect(() => {
    if (direction === "transferStatus") {
      navigate("/transferStatus", {
        state: {
          transactionId: transactionId,
          responseCode: responseCode,
          status: status,
        },
      });
    }
  }, [direction]);

  const MenuItem = ({ text }) => (
    <Grid item xs={12 / 3}>
      <Link className="body_mid_box" to="/login">
        <img src={GoodEx} alt="" className="body_mid_img" />
        <p className="body_mid_text">{text}</p>
      </Link>
    </Grid>
  );

  return (
    <div className="landingPage">
      <div className="header">
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          className="header_btn"
        >
          Đăng nhập
        </Button>
        <Button
          variant="contained"
          className="header_btn"
          onClick={() => navigate("/signup")}
        >
          Đăng ký
        </Button>
      </div>
      <div className="body">
        <div className="body_top">
          <div>
            <p className="body_top_text">
              Nền Tảng <br /> Trao đổi <br /> Dụng cụ FU
            </p>
            {/* <p className="body_top_desc">
                            Trải nghiệm sự đa dạng của hệ thống chúng tôi ngay
                            bây giờ
                        </p> */}
          </div>
          <img src={GoodExLogo} alt="" className="body_top_img" />
        </div>
        <Grid container spacing={2}>
          <MenuItem text="Đặt Chỗ" />
          <MenuItem text="Tính năng xã hội" />
          <MenuItem text="Bản đồ và chỉ đường" />
        </Grid>
      </div>
      {/* -----------------------------------------------------------------PRE/FAQ---------------------------------------------------------- */}
      <FAQ />
      <PRE />
      <FOOTER/>
 {/* -----------------------------------------------------------------PRE/FAQ---------------------------------------------------------- */}

    </div>
  );
}
