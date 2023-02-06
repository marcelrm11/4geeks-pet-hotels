import React from "react";

export const Button = ({ buttonClass = "", onClick, children }) => {
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};
