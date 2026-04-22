import { useSelector, useDispatch } from "react-redux";
import { toggleFollow, setSelectedChannel } from "../redux/chatSlice";

function Channels({ setSelectedStatus }) {
  const channels = useSelector(state => state.chat.channels || []);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Channels</h3>

      {channels.map(c => (
        <div key={c.id} style={{
          padding: "10px",
          borderBottom: "1px solid #ddd"
        }}>

          {/* 🔥 OPEN CHANNEL */}
          <div onClick={() => {
            dispatch(setSelectedChannel(c.id));
            setSelectedStatus(null); // 🔥 CLEAR STATUS
          }}>
            {c.name}
          </div>

          <button
            onClick={() => dispatch(toggleFollow(c.id))}
            style={{
              marginTop: "5px",
              padding: "5px",
              background: c.followed ? "gray" : "#25D366",
              color: "white",
              border: "none"
            }}
          >
            {c.followed ? "Following" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Channels;