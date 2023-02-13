import React from "react";

export const Button = ({ buttonClass = "", onClick, children, ...rest }) => {
  return (
    <button className={buttonClass} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
