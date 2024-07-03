import { useMediaQuery, useTheme } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  const theme = useTheme();
  const mediaQuery = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "CHAT WITH AI",
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        "BUILT WITH OPEN AI",
        2000,
        "CUSTOMIZED CHAT-GPT",
        1500,
      ]}
      speed={50}
      style={{
        display: "inline-block",
        fontSize: mediaQuery ? "30px" : "50px",
        alignItems: "center",
        textAlign: "center",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
