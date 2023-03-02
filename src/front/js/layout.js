import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Signup } from "./pages/signup";
import { SignupOwner } from "./pages/signup-owner";
import { SelectSignup } from "./pages/selectSignup";
import { Hotel } from "./pages/hotel";
import { AddHotel } from "./pages/addHotel";
import { AddPet } from "./pages/addPet";
import { Booking } from "./pages/booking.js";
import { HotelListing } from "./pages/hotelListing";
import { Favorites } from "./pages/favorites.js";
import { Profile } from "./pages/profile";
import { Account } from "./pages/account";
import { PetProfile } from "./pages/petProfile";

const Layout = () => {
  const { store, actions } = useContext(Context);

  const basename = process.env.BASENAME || "";

  useEffect(() => {
    actions.getUserFromSessionStorage();
    actions.tokenSessionStore();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      store.user = JSON.parse(storedUser);
    }
  }, []);

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Signup />} path="/signup/user" />
            <Route element={<SelectSignup />} path="/selectSignup" />
            <Route element={<SignupOwner />} path="/signup/owner" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<PetProfile />} path="/petProfile" />
            <Route element={<AddHotel />} path="/addHotel" />
            <Route element={<AddPet />} path="/addPet" />
            <Route element={<HotelListing />} path="/hotelListing" />
            <Route element={<Hotel />} path="/hotel/:id" />
            <Route element={<Booking />} path="/booking" />
            <Route element={<Favorites />} path="/favorites" />
            <Route element={<Account />} path="/account" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
