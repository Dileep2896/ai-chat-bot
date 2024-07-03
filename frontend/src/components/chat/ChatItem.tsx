import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighLighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }

  return false;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        my: 2,
        gap: 2,
        width: "100vh",
      }}
    >
      <Avatar src="logo.webp" sx={{ ml: 0 }}></Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ color: "white" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, i) => {
            let lang = "javascript";
            if (isCodeBlock(block)) {
              const langList = block.split("\n")[0].split(" ");
              if (langList.length == 1) lang = langList[0];
            }
            return isCodeBlock(block) ? (
              <SyntaxHighLighter key={i} style={coldarkDark} language={lang}>
                {block}
              </SyntaxHighLighter>
            ) : (
              <Typography key={i} sx={{ color: "white" }}>
                {block}
              </Typography>
            );
          })}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2, my: 2 }}>
      <Avatar sx={{ ml: 0, bgcolor: "black" }}>
        {auth?.user?.name.slice(0, 2).toUpperCase()}
      </Avatar>
      <Box>
        <Typography sx={{ color: "white" }}>{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
