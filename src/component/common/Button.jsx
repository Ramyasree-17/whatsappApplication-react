import colors from "../../theme/colors";

function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 15px",
        borderRadius: "20px",
        border: "none",
        background: colors.primary,
        color: colors.white,
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
}

export default Button;