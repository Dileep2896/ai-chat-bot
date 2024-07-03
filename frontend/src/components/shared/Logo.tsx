import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Link to={"/"}>
        <Avatar src="logo.webp" alt="aichat"></Avatar>
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ color: "lightgreen" }}>Talk</span>Bot
      </Typography>
    </div>
  );
};

export default Logo;
