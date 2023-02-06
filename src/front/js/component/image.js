import React from "react";

export const Image = ({ figureClass, src, altText }) => {
  return (
    <figure className={figureClass}>
      <img src={src} alt={altText} />
    </figure>
  );
};
