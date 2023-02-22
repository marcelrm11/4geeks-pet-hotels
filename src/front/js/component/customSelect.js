import React from "react";

export const CustomSelect = ({
  name,
  onChange,
  required,
  value,
  defaultOption,
  list,
  children,
}) => {
  return (
    <select
      name={name}
      className="py-0"
      onChange={onChange}
      required={required}
      value={value}
    >
      <option key={defaultOption} value={defaultOption} disabled>
        {children}
      </option>
      {list.map((c) => (
        <option key={c}>{c}</option>
      ))}
    </select>
  );
};
