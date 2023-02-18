import React, { useEffect } from "react";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    redirectSignUp: false,
    store: {
      token: null,
      loading: true,
      favorites: [],
      hotels: [],
      regexs: {
        passwordRegex:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/,
        emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        zipCodeRegex: /^\d{3,10}$/,
        phoneNumberRegex: /^\d{8,14}$/,
      },
      errors: {},
      signupSuccessful: false,
<<<<<<< HEAD
      addHotelSuccessful: false,
      user: {},
=======
      showModal: false,
      user: {
        email: "",
      },
>>>>>>> development
    },
    actions: {
      login: async (e, email, password) => {
        const store = getStore();
        e.preventDefault();
        const opt = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          //mode: "no-cors",
        };

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/login",
            opt
          );

          const data = await response.json();
          console.log(data, response.status);
          if (response.status !== 200) {
            throw Error(data.error);
          } else {
            sessionStorage.setItem("token", data.access_token);
            // console.log(sessionStorage.getItem("token"));
            sessionStorage.setItem("user", JSON.stringify(data.user));
            // console.log(JSON.parse(sessionStorage.getItem("user")));
            setStore({
              token: data.access_token,
              user: data.user,
            });
          }
        } catch (error) {
          setStore({ errors: error.errors });
          console.error(error, store.errors);
        }
      },

<<<<<<< HEAD
      listing: useEffect(() => {
        const store = getStore();
        fetch(process.env.BACKEND_URL + "/api/hotels")
          .then((response) => response.json())
          .then((data) =>
            setStore({ hotels: [...store.hotels, ...data.hotels] })
          );

        setStore({ loading: false });
      }, []),
=======
      showModal: () => {
        console.log("trying to show modal");
        setStore({ showModal: true });
      },
      hideModal: () => {
        setStore({ showModal: false });
      },
>>>>>>> development

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

      addFavorites: (id) => {
        const store = getStore();
        console.log(id);
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
