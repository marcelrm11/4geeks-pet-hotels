import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Signup } from "./pages/signup";
import { SignupOwner } from "./pages/signup-owner";
import { SelectSignup } from "./pages/selectSignup";
import { Hotel } from "./pages/hotel";
import { AddHotel } from "./pages/addHotel";
import { Booking } from "./pages/booking.js";
import { HotelListing } from "./pages/hotelListing";
import { Favorites } from "./pages/favorites.js";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AddHotel />} path="/addHotel" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<SelectSignup />} path="/selectSignup" />
            <Route element={<SignupOwner />} path="/signup/owner" />
            <Route element={<HotelListing />} path="/hotelListing" />
            <Route element={<Hotel />} path="/hotel/:id" />
            <Route element={<AddHotel />} path="/addHotel" />
            <Route element={<Booking />} path="/booking" />
            <Route element={<Favorites />} path="/favorites" />
            <Route element={<HotelListing />} path="/hotelListing" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
