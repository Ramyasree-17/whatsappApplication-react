import { useSelector } from "react-redux";
import Sidebar from "../component/sidebar.jsx";

import ChatsPage from "./chats.jsx";
import StatusPage from "./Status.jsx";
import CallsPage from "./Calls.jsx";
import CommunitiesPage from "./CommunitiesPage.jsx";

function MainPage() {
  const activeTab = useSelector(state => state.chat.activeTab);

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* 🔥 Sidebar moved here */}
      <Sidebar />

      {/* 🔥 Page rendering */}
      {activeTab === "chats" && <ChatsPage />}
      {activeTab === "status" && <StatusPage />}
      {activeTab === "calls" && <CallsPage />}
      {activeTab === "communities" && <CommunitiesPage />}

    </div>
  );
}

export default MainPage;