const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      // message: null,
      // demo: [
      //   {
      //     title: "FIRST",
      //     background: "white",
      //     initial: "white",
      //   },
      //   {
      //     title: "SECOND",
      //     background: "white",
      //     initial: "white",
      //   },
      // ],
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
      // Use getActions to call a function within a fuction
      // exampleFunction: () => {
      //   getActions().changeColor(0, "green");
      // },

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
      },

      // getMessage: async () => {
      //   const store = getStore();
      //   const opt = {
      //     headers: { Authorization: "Bearer " + store.token },
      //   };

      //   try {
      //     // fetching data from the backend
      //     const resp = await fetch(
      //       "https://3001-marcelrm11-4geekspethot-khhwppgad2k.ws-eu84.gitpod.io/api/hello",
      //       opt
      //     );
      //     const data = await resp.json();
      //     setStore({ message: data.message });
      //     console.log("funciono", data);
      //     // don't forget to return something, that is how the async resolves
      //     return data;
      //   } catch (error) {
      //     console.error("Error loading message from backend", error);
      //   }
      // },
      // changeColor: (index, color) => {
      //   //get the store
      //   const store = getStore();

      //   //we have to loop the entire demo array to look for the respective index
      //   //and change its color
      //   const demo = store.demo.map((elm, i) => {
      //     if (i === index) elm.background = color;
      //     return elm;
      //   });

      //   //reset the global store
      //   setStore({ demo: demo });
      // },
    },
  };
};

export default getState;
