import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Signup } from "./pages/signup";
import { Hotel } from "./pages/hotel";
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
            <Route element={<Signup />} path="/signup" />
            <Route element={<Hotel />} path="/hotel/:id" />
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
