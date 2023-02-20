import React from "react";
export const Input = ({
  type = "text",
  placeholder,
  id,
  name = id,
  value,
  onChange,
  required = false,
  children,
}) => {
  return (
    <div className="d-inline position-relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      />
      {children}
    </div>
  );
};
