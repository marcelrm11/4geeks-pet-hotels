import React from "react";

export const Button = ({ buttonClass = "", onClick, children, ...rest }) => {
  return (
    <button className={buttonClass + " px-4 py-2"} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
