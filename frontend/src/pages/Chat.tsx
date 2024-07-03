import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = {
      role: "user",
      content: content,
    };
    setMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Unable to Delete Chats", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setMessages([...data.chats]);
          toast.success("Successfully Loading Chats", { id: "loadchats" });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error Loading Chats", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "black",
            borderRadius: 2,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: "700",
            }}
          >
            {auth?.user?.name.slice(0, 2).toUpperCase()}
          </Avatar>
          <Typography
            sx={{
              mx: "auto",
            }}
          >
            You are Talking to a TalkBot
          </Typography>

          <Typography
            sx={{
              mx: "auto",
              my: 4,
              p: 3,
            }}
          >
            You are Talking to a TalkBot
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            fontWeight: "600",
            mx: "auto",
          }}
        >
          MODEL - GPT 4 TURBO
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {messages.map((chat, i) => (
            <ChatItem content={chat.content} role={chat.role} key={i} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            paddingBottom: "20px",
            paddingTop: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39",
            display: "flex",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            ref={inputRef}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: " none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend></IoMdSend>
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
