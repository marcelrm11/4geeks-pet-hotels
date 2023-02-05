export const Input = ({
  type = "text",
  placeholder,
  id,
  value,
  onChange,
  required = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};
