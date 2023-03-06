import React, { useEffect } from "react";
import moment from "moment";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    redirectSignUp: false,
    store: {
      token: null,
      loading: true,
      countryList: [],
      favorites: [],
      hotels: [],
      homeHotels: [],
      is_owner: false,
      regexs: {
        passwordRegex:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/,
        emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        zipCodeRegex: /^\d{3,10}$/,
        phoneNumberRegex: /^\d{8,14}$/,
      },
      errors: {},
      signupSuccessful: false,
      loginSuccessful: false,
      logoutSuccessful: false,
      addHotelSuccessful: false,
      createdSuccesfully: false,
      editeddSuccesfully: false,
      deletedSuccesfully: false,
      updatedSuccesfully: false,
      invalidData: false,
      showModal: false,
      user: {},
      owner: {},
      ownerHotels: [],
      userType: "",

      // entryDate: "dd/mm/yyyy",
      // checkOutDate: "dd/mm/yyyy",
      // differenceInDays: 0,
      pets: [],
      editPet: false,
      currentPetId: "",
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
      checkInput: ["dog", "cat", "rodent", "bird", "others"],
      editUser: false,
      userId: "",
    },
    actions: {
      handleEditUser: (user_id) => {
        const store = getStore();
        setStore({ editUser: true, userId: user_id });
      },

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
          console.log("data", data, response.status);

          if (!store.is_owner) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", JSON.stringify(data.access_token));
            localStorage.setItem("userType", JSON.stringify("user"));
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const storedToken = JSON.parse(localStorage.getItem("token"));
            const storedUserType = JSON.parse(localStorage.getItem("userType"));
            setStore({
              token: storedToken,
              user: storedUser,
              userType: storedUserType,
            });
          } else {
            localStorage.setItem("owner", JSON.stringify(data.owner));
            localStorage.setItem("token", JSON.stringify(data.access_token));
            localStorage.setItem("userType", JSON.stringify("owner"));
            const storedUser = JSON.parse(localStorage.getItem("owner"));
            const storedToken = JSON.parse(localStorage.getItem("token"));
            const storedUserType = JSON.parse(localStorage.getItem("userType"));
            setStore({
              token: storedToken,
              owner: storedUser,
              userType: storedUserType,
            });
          }
          localStorage.setItem(
            "ownerHotels",
            JSON.stringify(store.owner.hotels)
          );
          const storageHotels = localStorage.getItem("ownerHotels");

          console.log("storage hotels", storageHotels);

          if (storageHotels !== null && storageHotels !== "undefined") {
            const parsedHotels = JSON.parse(storageHotels);
            setStore({ ownerHotels: parsedHotels });
          }
          setStore({ loginSuccessful: true });
          setTimeout(() => {
            setStore({ loginSuccessful: false });
          }, 3000);
        } catch (error) {
          setStore({ invalidData: true });
          setTimeout(() => {
            setStore({ invalidData: false });
          }, 3000);
          setStore({ errors: error.errors });
          console.error(error, store.errors);
        }
      },

      updateUser: async (userId, token) => {
        const response = await fetch(
          process.env.BACKEND_URL + `/api/user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        const userData = await response.json();
        setStore({ user: userData });
        localStorage.setItem("user", JSON.stringify(userData));
      },

      listing: (searchFilters) => {
        const store = getStore();
        let url = process.env.BACKEND_URL + "/api/hotels";
        // for (let [key,value] in Object.entries(searchFilters)) {
        //   añadir los filters a la url
        // }
        if (searchFilters) {
          url += `?`;
          if (searchFilters.country !== "select-country") {
            url += `country=${searchFilters.country}`;
          }

          const petsObj = searchFilters.petTypes;

          for (let pet in petsObj) {
            if (petsObj[pet]) {
              url += `&${pet}=true`;
            }
          }
        }

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setStore({ hotels: data.hotels });
          });
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
        console.log("getting user from LocalStorage");
        const user = localStorage.getItem("user");
        const userType = localStorage.getItem("userType");
        console.log("user is:", user);
        const owner = localStorage.getItem("owner");
        const ownerType = localStorage.getItem("userType");
        const hotels = localStorage.getItem("ownerHotels");
        try {
          if (user !== null) {
            console.log("user == true, so parsing and setting");
            const parsedUser = JSON.parse(user);
            const parsedUType = JSON.parse(userType);
            setStore({ user: parsedUser, userType: parsedUType });
          } else if (owner !== null) {
            console.log("owner is:", owner);
            console.log("owner == true, so parsing and setting");
            const parsedOwner = JSON.parse(owner);
            const parsedOType = JSON.parse(ownerType);
            const parsedHotels = JSON.parse(hotels);
            setStore({
              owner: parsedOwner,
              userType: parsedOType,
              ownerHotels: parsedHotels,
            });
          }
        } catch (error) {
          console.error("Error parsing user from session storage:", error);
          setStore({ user: {}, owner: {} });
        }
      },

      tokenSessionStore: () => {
        const token = localStorage.getItem("token");
        if (token) setStore({ token: JSON.parse(token) });
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
          const data = await response.json();
          console.log(data);
          if (response.ok) {
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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("owner");
        localStorage.removeItem("userType");
        localStorage.removeItem("ownerHotels");
        setStore({
          token: null,
          user: {},
          owner: {},
          userType: "",
          ownerHotels: [],
          logoutSuccessful: true,
        });
        setTimeout(() => {
          setStore({ logoutSuccessful: false });
        }, 3000);
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
        fetch("https://restcountries.com/v3.1/all", {
          headers: {
            "Access-Control-Allow-Origin": "true",
          },
        })
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

      toggleFavorite: async (hotelId, userId) => {
        const actions = getActions();
        const resFavorite = await fetch(
          process.env.BACKEND_URL + `/api/favorite/${hotelId}/${userId}`
        );
        console.log(resFavorite);
        const dataFavorite = await resFavorite.json();
        console.log(dataFavorite);
        if (resFavorite.ok) {
          // favorite exists in db
          const response = await fetch(
            process.env.BACKEND_URL +
              `/api/favorite/${dataFavorite.favorite.id}/delete`,
            {
              method: "DELETE",
            }
          );
          console.log(response);
          const data = await response.json();
          console.log(data);
        } else if (resFavorite.status === 404) {
          // fav doesn't exist
          const response = await fetch(
            process.env.BACKEND_URL + "/api/favorite/create/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: userId,
                hotel_id: hotelId,
              }),
            }
          );
          console.log(response);
          const data = await response.json();
          console.log(data);
        }
        actions.updateUser(userId);
        // // store.hotels.map((hotel) => {
        // //   if (hotel.id === hotelId && !store.favorites.find((f) => f.id === hotelId)) {
        // //     setStore({
        // //       favorites: [
        // //         ...store.favorites,
        // //         { hotelId: hotelId, userId: userId },
        // //       ],
        // //     });
        // //   }
        // // });
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
        if (!hotelData.services || hotelData.services.length === 0) {
          newErrors["services"] = "Please select at least one services.";
        }
        if (Object.keys(newErrors).length === 0) {
          // actions.handleAddHotelData(hotelData);
          return true;
        } else {
          setStore({ errors: newErrors });
          console.log("errors", newErrors);
        }
        // hotel;
        // return Object.keys(newErrors).length === 0;
        return false;
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
                Authorization: "Bearer " + store.token,
              },
              body: JSON.stringify(hotelData),
            }
          );

          console.log("response", response);
          const data = await response.json();
          console.log("data", data);
          if (response.ok) {
            if (data.hotel_owner_id == store.owner.id) {
              setStore({ ownerHotels: [...store.ownerHotels, data] });
            }
            setStore({ addHotelSuccessful: true });
            setTimeout(() => {
              setStore({ addHotelSuccessful: false });
            }, 4000);
            return true;
          }
          throw Error(response.statusText);
        } catch (e) {
          console.log("error:", e);
        }
      },

      updateHotel: async (formData, token) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/hotel/${formData.id}/update`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, //! al loro!
              },
              body: JSON.stringify(formData),
            }
          );
          console.log(response);
          const data = await response.json();
          console.log(data);
          if (response.ok) return true;
          else return false;
        } catch (e) {
          console.log(e);
        }
      },

      handleEntry: (e) => {
        const actions = getActions();
        const formattedDate = moment(e.target.value).format("YYYY-MM-DD");
        actions.handleEntryDate(formattedDate);
      },

      handleCheckOut: (e) => {
        const actions = getActions();
        const formattedDate = moment(e.target.value).format("YYYY-MM-DD");
        actions.handleCheckOutDate(formattedDate);
      },

      handleCheckOutDate: (formattedDate) => {
        const store = getStore();
        setStore({ checkOutDate: formattedDate });
        setStore({
          differenceInDays: moment(store.checkOutDate).diff(
            moment(store.entryDate),
            "days"
          ),
        });
      },
      handleEntryDate: (formattedDate) => {
        const store = getStore();
        if (store.entryDate || store.entryDate != "") {
          setStore({ entryDate: formattedDate });
        }
        console.log(store.entryDate);
      },

      handleValidatePetForm: (ev, petData) => {
        const store = getStore();
        const actions = getActions();
        ev.preventDefault();
        let newErrors = {};
        for (let field in petData) {
          if ((petData[field] === "") | []) {
            newErrors[field] = `${field} is required`;
          }
        }

        if (Object.keys(newErrors).length === 0) {
          actions.handleAddpetData(petData);
        } else {
          setStore({ errors: newErrors });
          console.log("errors", newErrors);
        }
        return Object.keys(newErrors).length === 0;
      },

      handleAddpetData: async (petData) => {
        console.log("sent form:", petData);
        const store = getStore();
        store.createdSuccesfully = false;
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/pet/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(petData),
            }
          );

          console.log("response", response);

          if (response.ok) {
            const data = await response.json();
            console.log("data", data);
            setStore({ createdSuccesfully: true });
            setTimeout(() => setStore({ createdSuccesfully: false }), 4000);
            return true;
          }
          throw Error(response.statusText);
        } catch (e) {
          console.log("error:", e);
        }
      },

      getAllPets: async (id) => {
        const store = getStore();
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/pets");
          if (response.ok) {
            const data = await response.json();
            setStore({ pets: data.pets });
            return data;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      },

      handleEditPet: (pet_id) => {
        const store = getStore();
        const editedPet = store.pets.filter((item) => item.id === pet_id)[0];
        setStore({ editPet: true });
        console.log("one", editedPet);
        setStore({ currentPetId: pet_id });
      },

      handleEditPetsInfo: async (ev, petData) => {
        const store = getStore();
        ev.preventDefault();
        console.log("old data", petData);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/pet/${store.currentPetId}/update`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(petData),
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log("new data", data);
            setStore({ currentPetId: "", editedPet: false });
            setStore({ createdSuccesfully: true });
            setTimeout(() => setStore({ createdSuccesfully: false }), 4000);
            return data;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      },

      handleDeletePet: async (pet_id, petData) => {
        console.log("old data", petData);
        const store = getStore();
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/pet/${pet_id}/delete`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log("data", data);
            setStore({ deletedSuccesfully: true });
            setTimeout(() => setStore({ deletedSuccesfully: false }), 1000);
            let deletePet = store.pets.filter(
              (element) => element.id !== pet_id
            );
            setStore({ pets: [...deletePet] });
            return data;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      },

      handleEditUserInfo: async (ev, formData) => {
        const store = getStore();
        ev.preventDefault();
        console.log("old data", formData);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/user/${store.userId}/update`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log("new data", data);
            setStore({ userId: "", editUser: false, user: data });
            setStore({ updatedSuccesfully: true });
            setTimeout(() => setStore({ updatedSuccesfully: false }), 4000);
            return data;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      },
      handleEditOwnerInfo: async (ev, ownerData) => {
        const store = getStore();
        ev.preventDefault();
        console.log("old data", ownerData);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/owner/${store.userId}/update`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ownerData),
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log("new data", data.updated_owner);
            localStorage.setItem("owner", JSON.stringify(data.updated_owner));
            const storedUser = JSON.parse(localStorage.getItem("owner"));
            setStore({ userId: "", editUser: false, owner: storedUser });
            setStore({ updatedSuccesfully: true });
            setTimeout(() => setStore({ updatedSuccesfully: false }), 4000);
            return data;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      },
    },
  };
};

export default getState;
