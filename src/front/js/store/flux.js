const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      regexs: {
        passwordRegex:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/,
        emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        zipCodeRegex: /^\d{3,10}$/,
        phoneNumberRegex: /^\d{8,14}$/,
      },
      errors: {},
    },
    actions: {
      login: async (email, password) => {
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
          const response = await fetch(
            process.env.BACKEND_URL + "api/login",
            opt
          );
          if (response.status !== 200) {
            alert("there has been an error");
            return false;
          }

          const data = await response.json();
          console.log("token", data.access_token);
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error(`there is an error`, error);
        }
      },

      tokenSessionStore: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },
      handleValidateForm: (ev, formData) => {
        const actions = getActions();
        const regexs = getStore().regexs;

        ev.preventDefault();
        let newErrors = {};

        // TODO Improve the pattern with a better loop
        for (let field in formData) {
          if (formData[field] === "") {
            newErrors[field] = `${field} is required`;
          } else if (!regexs.emailRegex.test(Object.values(formData)[2])) {
            newErrors.email = "You have entered an invalid email address!";
          } else if (!regexs.passwordRegex.test(Object.values(formData)[3])) {
            newErrors.password = "You have entered an invalid password!";
          } else if (
            Object.values(formData)[3] !== Object.values(formData)[4]
          ) {
            newErrors.confirm_password =
              "Fields 'Password' and 'Confirm password' do not match";
          } else if (!regexs.zipCodeRegex.test(Object.values(formData)[6])) {
            newErrors.zip_code = "You have entered an invalid zip code!";
          } else if (
            !regexs.phoneNumberRegex.test(Object.values(formData)[7])
          ) {
            newErrors.phone_number =
              "You have entered an invalid phone number!";
          }
        }

        setStore({ errors: newErrors });
        if (Object.keys(newErrors).length === 0) {
          actions.handleSignupClick(formData);
        }

        console.log("errors", newErrors);
        return Object.keys(newErrors).length === 0;
      },

      handleSignupClick: async (formData) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          // mode: "no-cors", //? are we sure?
        });
        console.log(response);
        const cookies = response.headers.get("set-cookie");
        console.log(cookies);
        const data = await response.json();
        console.log(data);
        console.log(Cookies.get("access_token_cookie"));
        // setToken(Cookies.get('access_token_cookie'))

        // .catch((error) => {
        //   "There was an error: ", error;
        // });
      },

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
      },
    },
  };
};

export default getState;
