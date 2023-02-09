
const getState = ({ getStore, getActions, setStore }) => {
  return {
    redirectSignUp: false,
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
      signupSuccessful: false,
      user: {},
    },
    actions: {
      login: async (e, email, password) => {
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
        };

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "api/login",
            opt
          );
          if (response.status !== 200) {
            throw Error("Bad Request");
          }
          const data = await response.json();
          console.log(data);
          sessionStorage.setItem("token", data.access_token);
          // console.log(sessionStorage.getItem("token"));
          sessionStorage.setItem("user", JSON.stringify(data.user));
          // console.log(JSON.parse(sessionStorage.getItem("user")));
          setStore({ token: data.access_token, user: data.user });
          return true;
        } catch (error) {
          console.error(`there is an error`, error);
        }
      },

      getUserFromSessionStorage: () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) setStore({ user: user });
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
              newErrors[
                field
              ] = `You have entered an invalid ${actions.removeUnderscores(
                field
              )}!`;
            }
          }
          if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password =
              "Fields 'Password' and 'Confirm password' do not match";
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
          const response = await fetch(process.env.BACKEND_URL + "api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            // mode: "no-cors", //? are we sure?
          });
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
    },
  };
};

export default getState;
