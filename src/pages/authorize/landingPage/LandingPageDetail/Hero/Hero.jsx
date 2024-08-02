import * as React from "react";
import Slider from "react-slick";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import heroImage from "../../../../../assets/imglanding.jpg";

import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material/styles"; // Add this line
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Hero() {
  const navigate = useNavigate();

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the speed as needed
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            FPTU&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              Goods Exchange
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            Explore our product range, offering high-quality items to suit your
            needs at FPTU. Enhance your experience with top-notch features and
            services.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              inputProps={{
                autoComplete: "off",
                "aria-label": "Enter your email address",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Start now
            </Button>
          </Stack>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <Box
          id="carousel"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: "center",
            // height: { xs: 200, sm: 600 },
            height: 380,
            width: "100%",
            borderRadius: "10px",
            outline: "1px solid",
            outlineColor:
              theme.palette.mode === "light"
                ? alpha("#BFCCD9", 0.5)
                : alpha("#9CCCFC", 0.1),
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          })}
        >
          <Slider {...settings}>
            <div>
              <img
                src={heroImage}
                alt="Hero Image 1"
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              />
            </div>
            <div>
              <img
                src={heroImage}
                alt="Hero Image 2"
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              />
            </div>
            <div>
              <img
                src={heroImage}
                alt="Hero Image 3"
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              />
            </div>
          </Slider>
        </Box>
      </Container>
    </Box>
  );
}
