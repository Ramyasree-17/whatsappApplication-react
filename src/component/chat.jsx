import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../redux/chatSlice";

function Chat() {
  const [input, setInput] = useState("");
  const bottomRef = useRef();

  const dispatch = useDispatch();

  const selectedChatId = useSelector(state => state.chat.selectedChatId);

  const chatList = useSelector(state => state.chat.chatList);
  const messages = useSelector(state => state.chat.messages[selectedChatId] || []);

  const selectedChat = chatList.find(c => c.id === selectedChatId);

  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    dispatch(sendMessage({
      chatId: selectedChatId,
      text: input,
      time
    }));

    setInput("");
  };

  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      height: "100vh"
    }}>

      {/* HEADER */}
      <div style={{
        padding: "10px",
        background: "#f0f2f5",
        borderBottom: "1px solid #ddd"
      }}>
        <h3 style={{ margin: 0 }}>
          {selectedChat?.name || "Select Chat"}
        </h3>
      </div>

      {/* MESSAGES */}
      <div style={{
        flex: 1,
        padding: "15px",
        background: "#ece5dd",
        overflowY: "auto"
      }}>

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "me" ? "flex-end" : "flex-start",
              marginBottom: "10px"
            }}
          >
            <div style={{
              background: msg.sender === "me" ? "#d9fdd3" : "white",
              padding: "8px 10px",
              borderRadius: "10px",
              maxWidth: "60%"
            }}>
              <span>{msg.text}</span>
              <div style={{
                fontSize: "10px",
                textAlign: "right"
              }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <form
        onSubmit={handleSend}
        style={{
          padding: "10px",
          background: "#f0f2f5",
          display: "flex"
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "8px 15px",
            borderRadius: "20px",
            border: "none",
            background: "#25D366",
            color: "white"
          }}
        >
          Send
        </button>
      </form>

    </div>
  );
}

export default Chat;