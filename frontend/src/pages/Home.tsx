import { Box, Typography } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";

const Home = () => {
  return (
    <Box
      width="100%"
      height="100vh" // Ensures the outer box takes up the full viewport height
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          justifyContent: "center",
          mb: 20,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { md: "80px", sm: "60px", xs: "50px" },
            }}
          >
            <span style={{ color: "lightgreen" }}>TALK</span>BOT
          </Typography>
        </Box>
        <Box>
          <TypingAnim />
        </Box>
        <Box>
          <Typography>Create By: Dileep Kumar Sharma</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
