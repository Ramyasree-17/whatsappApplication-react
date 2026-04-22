import { useSelector, useDispatch } from "react-redux";
import { toggleFollow, openChannelView } from "../redux/chatSlice";

function Channels() {
  const channels = useSelector(state => state.chat.channels);
  const dispatch = useDispatch();

  return (
    <div style={{ width: "100%", padding: "10px" }}>
      <h3>Channels</h3>

      {channels.map(c => (
        <div key={c.id} style={{ marginBottom: "10px" }}>
          
          <div onClick={() => dispatch(openChannelView(c.id))}>
            {c.name}
          </div>

          <button
            onClick={() => {
              dispatch(toggleFollow(c.id));
              dispatch(openChannelView(c.id));
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