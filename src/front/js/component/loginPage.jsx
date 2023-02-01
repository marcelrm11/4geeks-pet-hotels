import React from "react";

const LoginPage = () => {
  return (
    <div className="text-center mt-5">
      {store.token && store.token != "" && store.token != undefined ? (
        `You are logged in with ${store.token}`
      ) : (
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};


