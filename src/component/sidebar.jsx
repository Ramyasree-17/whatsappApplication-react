import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/chatSlice";

import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import CallIcon from "@mui/icons-material/Call";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";

function Sidebar() {
  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.chat.activeTab);

  return (
    <div style={{
      width: "60px",
      background: "#202c33",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0"
    }}>

      {/* TOP */}
      <div>

        <ChatIcon
          onClick={() => dispatch(setActiveTab("chats"))}
          style={{ color: activeTab === "chats" ? "#25D366" : "gray", margin: "20px", cursor: "pointer" }}
        />

        <DonutLargeIcon
          onClick={() => dispatch(setActiveTab("status"))}
          style={{ color: activeTab === "status" ? "#25D366" : "gray", margin: "20px", cursor: "pointer" }}
        />

        <GroupsIcon
          onClick={() => dispatch(setActiveTab("communities"))}
          style={{ color: activeTab === "communities" ? "#25D366" : "gray", margin: "20px", cursor: "pointer" }}
        />

        <CallIcon
          onClick={() => dispatch(setActiveTab("calls"))}
          style={{ color: activeTab === "calls" ? "#25D366" : "gray", margin: "20px", cursor: "pointer" }}
        />

      </div>

      {/* BOTTOM */}
      <div>
        <SettingsIcon style={{ color: "gray", margin: "20px" }} />
        <AccountCircleIcon style={{ color: "gray", margin: "20px" }} />
      </div>

    </div>
  );
}

export default Sidebar;