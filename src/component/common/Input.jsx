function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        flex: 1,
        padding: "10px",
        borderRadius: "20px",
        border: "1px solid #ccc"
      }}
    />
  );
}

export default Input;