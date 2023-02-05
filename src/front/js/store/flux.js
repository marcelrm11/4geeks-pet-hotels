const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null
    },
    actions: {
      login: async (email, password) => {
        const opt = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
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
      handleValidateForm: (ev) => {
        ev.preventDefault();
        let newErrors = {};
    
        // TODO Improve the pattern with a better loop
        for (let field in formData) {
          if (formData[field] === "") {
            newErrors[field] = `${field} is required`
          } else if (!emailRegex.test(Object.values(formData)[2])){
            newErrors.email = "You have entered an invalid email address!"
          } else if (!passwordRegex.test(Object.values(formData)[3])) {
              newErrors.password = "You have entered an invalid password!";
          } else if (Object.values(formData)[3] !== Object.values(formData)[4]) {
              newErrors.confirm_password = "Fields 'Password' and 'Confirm password' do not match";
          } else if (!zipCodeRegex.test(Object.values(formData)[6])) {
              newErrors.zip_code = "You have entered an invalid zip code!";
          } else if (!phoneNumberRegex.test(Object.values(formData)[7])) {
              newErrors.phone_number = "You have entered an invalid phone number!";
          }
        }
    
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
          handleSignupClick();
        }
    
        console.log("errors", newErrors);
        return Object.keys(newErrors).length === 0;
      },

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
      }
    },
  };
};

export default getState;
