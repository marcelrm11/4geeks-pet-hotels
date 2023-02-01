import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [first_name, setFirst_name] = useState("")
	const [last_name, setLast_name] = useState("")
	const [country, setCountry] = useState("")
	const [zip_code, setZip_code] = useState("")
	const [phone_number, setPhone_number] = useState("")

	const handleSignupClick = () => {
		fetch("https://3001-marcelrm11-4geekspethot-tyge9jtrbzz.ws-eu84.gitpod.io/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": email,
				"password": password,
				"first_name": first_name,
				"last_name": last_name,
				"country": country,
				"zip_code": zip_code,
				"phone_number": phone_number
			})
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => {"There was an error: ", error})
	}

	return (
		<div className="text-center mt-5">
			<h1>Sign up</h1>
			<div className="forms">
				<input type="text" placeholder="First name" value={first_name} onChange={(ev) => setFirst_name(ev.target.value)}/>
				<input type="text" placeholder="Last name" value={last_name} onChange={(ev) => setLast_name(ev.target.value)}/>
				<input type="text" placeholder="Email" value={email} onChange={(ev) => setEmail(ev.target.value)}/>
				<input type="password" placeholder="Password" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
				<input type="text" placeholder="Country" value={country} onChange={(ev) => setCountry(ev.target.value)}/>
				<input type="text" placeholder="Zip code" value={zip_code} onChange={(ev) => setZip_code(ev.target.value)}/>
				<input type="number" placeholder="Phone number" value={phone_number} onChange={(ev) => setPhone_number(ev.target.value)}/>
				<button onClick={handleSignupClick}>Sign up</button>
			</div>
		</div>
	);
};
