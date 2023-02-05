import React from "react";
export const Input = ({
  type = "text",
  placeholder,
  id,
  name = id,
  value,
  onChange,
  required = false,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};
