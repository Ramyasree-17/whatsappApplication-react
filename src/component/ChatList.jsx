import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectChat } from "../redux/chatSlice";

function ChatList() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const chatList = useSelector(state => state.chat.chatList || []);
  const selectedChatId = useSelector(state => state.chat.selectedChatId);

  // use chatList (NOT chats)
  const filteredChats = (chatList || []).filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      width: "25%",
      height: "100vh",
      overflowY: "auto",
      background: "#ffffff",
      borderRight: "1px solid #ddd"
    }}>

      {/* HEADER */}
      <div style={{
        padding: "12px",
        background: "#f0f2f5",
        fontSize: "18px",
        fontWeight: "bold"
      }}>
        Chats
      </div>

      {/* SEARCH */}
      <div style={{ padding: "10px", background: "#f6f6f6" }}>
        <input
          type="text"
          placeholder="Search or start new chat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "80%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none"
          }}
        />
      </div>

      {/* CHAT LIST */}
      {filteredChats.map(chat => {
        const lastMsg = {
          text: chat.lastMessage,
          time: chat.time
        };

        return (
          <div
            key={chat.id}
            onClick={() => dispatch(selectChat(chat.id))}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              height: "50px",
              borderBottom: "1px solid #f0f0f0",
              cursor: "pointer",
              background:
                selectedChatId === chat.id ? "#e9edef" : "white"
            }}
          >

            {/* PROFILE */}
            <div style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "#ccc",
              marginRight: "10px"
            }}></div>

            {/* CONTENT */}
            <div style={{ flex: 1 }}>

              {/* NAME + TIME */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <h4 style={{
                  margin: 0,
                  fontSize: "15px",
                  fontWeight: "500"
                }}>
                  {chat.name}
                </h4>

                <small style={{
                  fontSize: "11px",
                  color: "#667781"
                }}>
                  {lastMsg?.time}
                </small>
              </div>

              {/* MESSAGE + UNREAD */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "5px"
              }}>

                <p style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#667781",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: "70%"
                }}>
                  {lastMsg?.text}
                </p>

                {chat.unread > 0 && (
                  <span style={{
                    background: "#25D366",
                    color: "white",
                    borderRadius: "50%",
                    padding: "4px 8px",
                    fontSize: "11px",
                    minWidth: "20px",
                    textAlign: "center"
                  }}>
                    {chat.unread}
                  </span>
                )}

              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default ChatList;