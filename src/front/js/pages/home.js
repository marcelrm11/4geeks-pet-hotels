import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Hello {store.user.first_name}!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://start.4geeksacademy.com/starters/react-flask">
          Read documentation
        </a>
      </p>
    </div>
  );
};
