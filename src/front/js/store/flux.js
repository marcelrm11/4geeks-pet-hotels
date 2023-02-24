import React, { useEffect } from "react";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    redirectSignUp: false,
    store: {
      token: null,
      loading: true,
      countryList: [],
      favorites: [],
      hotels: [],
      is_owner: true,
      regexs: {
        passwordRegex:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/,
        emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        zipCodeRegex: /^\d{3,10}$/,
        phoneNumberRegex: /^\d{8,14}$/,
      },
      errors: {},
      signupSuccessful: false,
      addHotelSuccessful: false,
      showModal: false,
      user: {
        email: "",
      },

      owner: {
        email: "",
      },

      button: [
        {
          btn_class: "log_socialMedia google_signup_btn",
          type: "Sign up with Google",
          redirect: "/",
          link_class: "white_letter",
        },
        {
          btn_class: "log_socialMedia",
          type: "Sign up with Facebook",
          redirect: "/",
          link_class: "white_letter",
        },
      ],
    },
    actions: {
      handleSelectType: (boolean) => {
        const store = getStore();
        setStore({ is_owner: boolean });
        console.log(store.is_owner);

        const div = document.getElementById("login-div"); 
        div.classList.add("login_inputs");
        div.classList.remove("select_type");
      },

      login: async (e, email, password) => {
        const store = getStore();
        e.preventDefault();
        const endpoint = store.is_owner ? "/api/login/owner" : "/api/login";
        const opt = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const response = await fetch(process.env.BACKEND_URL + endpoint, opt);

          const data = await response.json();
          console.log(data, response.status);
          if (response.status !== 200) {
            throw Error(data.error);
          } else {
            sessionStorage.setItem("token", data.access_token);
            if (!is_owner) {
              sessionStorage.setItem("user", JSON.stringify(data.user));
              setStore({
                token: data.access_token,
                user: data.user,
              });
            } else {
              sessionStorage.setItem("owner", JSON.stringify(data.owner));
              setStore({
                token: data.access_token,
                owner: data.owner,
              });
            }
          }
        } catch (error) {
          setStore({ errors: error.errors });
          console.error(error, store.errors);
        }
      },

      listing: (searchFilters) => {
        const store = getStore();
        let url = process.env.BACKEND_URL + "/api/hotels";
        // for (let [key,value] in Object.entries(searchFilters)) {
        //   añadir los filters a la url
        // }
        if (searchFilters) {
          if (searchFilters.country !== "select-country") {
            url += `?country=${searchFilters.country}`;
          }
        }
        fetch(url)
          .then((response) => response.json())
          .then((data) => setStore({ hotels: data.hotels }));
        setStore({ loading: false });
      },

      showModal: () => {
        console.log("trying to show modal");
        setStore({ showModal: true });
      },
      hideModal: () => {
        setStore({ showModal: false });
      },

      getUserFromSessionStorage: () => {
        const user = sessionStorage.getItem("user");
        try {
          if (user) {
            const parsedUser = JSON.parse(user);
            setStore({ user: parsedUser });
          }
        } catch (error) {
          console.error("Error parsing user from session storage:", error);
          setStore({ user: { email: "" } });
        }
      },
      tokenSessionStore: () => {
        const token = sessionStorage.getItem("token");
        if (token) setStore({ token: token });
      },

      handleValidateForm: (ev, formData) => {
        const actions = getActions();
        const regexs = getStore().regexs;
        ev.preventDefault();
        let newErrors = {};
        for (let field in formData) {
          const camelField = actions.kebabToCamel(field);
          if (formData[field] === "") {
            newErrors[field] = `${field} is required`;
          } else if (
            ["email", "password", "zip_code", "phone_number"].includes(field)
          ) {
            if (!regexs[`${camelField}Regex`].test(formData[field])) {
              newErrors[field] = `Invalid ${actions.removeUnderscores(field)}!`;
            }
          }
          if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password = "Passwords do not match";
          }
        }
        if (Object.keys(newErrors).length === 0) {
          actions.handleSignupClick(formData);
        } else {
          setStore({ errors: newErrors });
          console.log("errors", newErrors);
        }

        return Object.keys(newErrors).length === 0;
      },

      handleSignupClick: async (formData) => {
        console.log("sent form:", formData);
        const store = getStore();
        store.signupSuccessful = false;
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signup/user",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
              //mode: "no-cors", //? are we sure?
            }
          );
          console.log(response);
          // const cookies = response.headers.get("set-cookie");
          // console.log(cookies);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setStore({ signupSuccessful: true });
            setTimeout(() => setStore({ signupSuccessful: false }), 4000);
            return true;
          }
          throw Error(response.statusText);
        } catch (e) {
          console.log("error:", e);
        }
      },

      handleValidateOwnerForm: (ev, ownerData) => {
        const actions = getActions();
        const regexs = getStore().regexs;
        ev.preventDefault();
        let newErrors = {};
        for (let field in ownerData) {
          const camelField = actions.kebabToCamel(field);
          if (ownerData[field] === "") {
            newErrors[field] = `${field} is required`;
          } else if (
            ["email", "password", "zip_code", "phone_number"].includes(field)
          ) {
            if (!regexs[`${camelField}Regex`].test(ownerData[field])) {
              newErrors[field] = `Invalid ${actions.removeUnderscores(field)}!`;
            }
          }
          if (ownerData.password !== ownerData.confirm_password) {
            newErrors.confirm_password = "Passwords do not match";
          }
        }
        if (Object.keys(newErrors).length === 0) {
          actions.handleSignupOwnerClick(ownerData);
        } else {
          setStore({ errors: newErrors });
          console.log("errors", newErrors);
        }

        return Object.keys(newErrors).length === 0;
      },

      handleSignupOwnerClick: async (ownerData) => {
        console.log("sent form:", ownerData);
        const store = getStore();
        store.signupSuccessful = false;
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signup/owner",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ownerData),
              //mode: "no-cors", //? are we sure?
            }
          );
          console.log(response);
          // const cookies = response.headers.get("set-cookie");
          // console.log(cookies);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setStore({ signupSuccessful: true });
            setTimeout(() => setStore({ signupSuccessful: false }), 4000);
            return true;
          }
          throw Error(response.statusText);
        } catch (e) {
          console.log("error:", e);
        }
      },

      logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setStore({ token: null, user: {} });
      },
      // helper functions
      camelToKebab: (word) => {
        return word.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
      },
      kebabToCamel: (word) => {
        return word.replace(/[-_]([a-z])/g, (match) => match[1].toUpperCase());
      },
      capitalize: (word) => {
        const wordArr = word.split("");
        return wordArr[0].toUpperCase() + wordArr.slice(1).join("");
      },
      removeUnderscores: (word) => {
        return word.replaceAll("_", " ");
      },
      setCountryList: () => {
        fetch("https://restcountries.com/v3.1/all")
          .then((res) => res.json())
          .then((data) => {
            let tempCountryList = [];
            for (let country of data) {
              tempCountryList.push(country.name.common);
            }
            tempCountryList.sort();
            setStore({ countryList: tempCountryList });
          })
          .catch((e) => {
            console.log(e);
          });
      },

      addFavorites: (id) => {
        const store = getStore();
        console.log(id);
        store.hotels.map((hotel) => {
          if (hotel.id === id && !store.favorites.find((f) => f.id === id)) {
            setStore({
              favorites: [
                ...store.favorites,
                { id: hotel.id, name: hotel.name },
              ],
            });
          }
        });
        localStorage.setItem("favorites", JSON.stringify(store.favorites));
        console.log(store.favorites);
      },

      deleteFavorites: (id) => {
        const store = getStore();
        let deleteFav = store.favorites.filter((element) => element.id !== id);
        setStore({ favorites: [...deleteFav] });
      },

      handleValidateHotelForm: (ev, hotelData) => {
        const actions = getActions();
        const regexs = getStore().regexs;
        ev.preventDefault();
        let newErrors = {};
        for (let field in hotelData) {
          const camelField = actions.kebabToCamel(field);
          if (hotelData[field] === "") {
            newErrors[field] = `${field} is required`;
          } else if (["email", "zip_code", "phone_number"].includes(field)) {
            if (!regexs[`${camelField}Regex`].test(hotelData[field])) {
              newErrors[
                field
              ] = `You have entered an invalid ${actions.removeUnderscores(
                field
              )}!`;
            }
          }
        }
        if (!hotelData.pet_type || hotelData.pet_type.length === 0) {
          newErrors["pet_type"] = "Please select at least one pet type.";
        }
        if (Object.keys(newErrors).length === 0) {
          actions.handleAddHotelData(hotelData);
        } else {
          setStore({ errors: newErrors });
          console.log("errors", newErrors);
        }
        return Object.keys(newErrors).length === 0;
      },

      handleAddHotelData: async (hotelData) => {
        console.log("sent form:", hotelData);
        const store = getStore();
        store.addHotelSuccessful = false;
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/hotel/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(hotelData),
            }
          );

          console.log(response);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setStore({ addHotelSuccessful: true });
            setTimeout(() => setStore({ addHotelSuccessful: false }), 4000);
            return true;
          }
          throw Error(response.statusText);
        } catch (e) {
          console.log("error:", e);
        }
      },
    },
  };
};

export default getState;
