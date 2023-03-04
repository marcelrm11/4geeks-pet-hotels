import React from "react";

export const Contact = () => {
  return (
    <>
      <form
        action="https://formsubmit.co/nicolettastruggia@hotmail.com"
        method="POST"
      >
        <input type="text" name="name" required />
        <input type="email" name="email" required />
        <textarea></textarea>
        <button type="submit">Send</button>
      </form>
    </>
  );
};
