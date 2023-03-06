import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer mt-auto py-3 text-center">
    <div className="pets-house-text">
      <h5>Pet House</h5>
      <p>Pets hotels finder</p>
    </div>
    <div>
      <h5>Follow Us</h5>
      <p>instagram</p>
      <p>Facebook</p>
      <p>TikTok</p>
      <p>Twitter</p>
    </div>
    <div>
      <Link to="/contact">
        <h5>Contact Us</h5>
      </Link>
    </div>
    <div>
    <Link to="/aboutUs">
        <h5>About Us</h5>
      </Link>
    </div>

    <div className="w-100 d_flex_row mg-tb">
      <p className="txt-center">Copyright © 2023 Pet House</p>
    </div>
  </footer>
);
