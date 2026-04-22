import { useState, useEffect } from "react";
import Channels from "./Channels";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedChannel } from "../redux/chatSlice";

function Status({ statuses, setStatuses }) {

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dispatch = useDispatch();

  const channels = useSelector(state => state.chat.channels);
  const selectedChannelId = useSelector(state => state.chat.selectedChannelId);

  const selectedChannel = channels.find(c => c.id === selectedChannelId);

  // 🔥 Reset slider when channel changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedChannelId]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const newStatus = {
      id: Date.now(),
      url,
      type: file.type.startsWith("video") ? "video" : "image",
      time: "Just now",
      name: "Ramya"
    };

    setStatuses([newStatus, ...statuses]);
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>

      {/* 🔥 LEFT SIDE */}
      <div style={{
        width: "25%",
        borderRight: "1px solid lightgray",
        overflowY: "auto",
        background: "white"
      }}>

        {/* MY STATUS */}
        <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
          <div style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#ccc",
            position: "relative"
          }}>
            <div
              onClick={() => document.getElementById("statusInput").click()}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#25D366",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              +
            </div>
          </div>

          <div>
            <h4>My Status</h4>
            <small>Click to add status</small>
          </div>
        </div>

        {/* FILE INPUT */}
        <input
          type="file"
          id="statusInput"
          style={{ display: "none" }}
          onChange={handleUpload}
        />

        {/* STATUS LIST */}
        {statuses.map(status => (
          <div
            key={status.id}
            onClick={() => {
              setSelectedStatus(status);
              dispatch(setSelectedChannel(null));
            }}
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              cursor: "pointer"
            }}
          >
            <div style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "3px solid #25D366"
            }}>
              {status.type === "image" ? (
                <img src={status.url} style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
              ) : (
                <video src={status.url} style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
              )}
            </div>

            <div>
              <h4>{status.name}</h4>
              <small>{status.time}</small>
            </div>
          </div>
        ))}

        {/* CHANNELS */}
        <div style={{ marginTop: "20px", borderTop: "1px solid #ddd", padding: "10px" }}>
          <Channels setSelectedStatus={setSelectedStatus} />
        </div>

      </div>

      {/* 🔥 RIGHT SIDE */}
      <div style={{
        flex: 1,
        height: "100vh",
        background: "skyblue",
        color: "white",
        display: "flex",
        flexDirection: "column"
      }}>

        <div style={{
          flex: 1,
          padding: "20px",
          boxSizing: "border-box"
        }}>

          {selectedChannel ? (

            <>
              {/* 🔥 SLIDER */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%"
              }}>

                {/* LEFT ARROW */}
                <button onClick={() => setCurrentIndex(p => Math.max(p - 1, 0))}>
                  ⬅️
                </button>

                {/* 5 ITEMS */}
                <div style={{
                  display: "flex",
                  gap: "10px",
                  flex: 1,
                  justifyContent: "center"
                }}>
                  {selectedChannel.posts
                    .slice(currentIndex, currentIndex + 5)
                    .map(post => (
                      <div key={post.id} style={{
                        width: "100px",
                        height: "100px",
                        background: "#333",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        textAlign: "center"
                      }}>
                        {post.text}
                      </div>
                  ))}
                </div>

                {/* RIGHT ARROW */}
                <button onClick={() =>
                  setCurrentIndex(p =>
                    Math.min(p + 1, selectedChannel.posts.length - 5)
                  )
                }>
                  ➡️
                </button>

              </div>

              {/* 🔥 FEED */}
              <div style={{
                marginTop: "20px",
                overflowY: "auto",
                height: "calc(100vh - 140px)"
              }}>
                {selectedChannel.posts.map(post => (
                  <div key={post.id} style={{
                    background: "#222",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "10px"
                  }}>
                    <div style={{
                      height: "150px",
                      background: "#444",
                      borderRadius: "8px",
                      marginBottom: "10px"
                    }} />
                    <p>{post.text}</p>
                  </div>
                ))}
              </div>

            </>

         ) : selectedStatus ? (

  <div style={{
    width: "100%",
    height: "100vh",   // 🔥 FIX
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111"
  }}>
    {selectedStatus.type === "image" ? (
      <img
        src={selectedStatus.url}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    ) : (
      <video
        src={selectedStatus.url}
        controls
        autoPlay
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    )}
  </div>

) : (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}>
              <h2>Select a Status or Channel</h2>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Status;