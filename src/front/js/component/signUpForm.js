import React, { Component } from "react";
import {Input} from "./input.js"

export const SignUpForm = ({formData, handleChange, handleValidateForm}) => (
	<form>
          <input
            type="hidden"
            id="crsf_token"
            value={formData.crsf_token}
            onChange={handleChange}
          />
          <Input 
          type="text" 
          placeholder="First name" 
          id="first_name" 
          value={formData.first_name}
          onChange={handleChange}
          />
          {errors.first_name && <p>{errors.first_name}</p>}
          <Input 
          type="text" 
          placeholder="Last name" 
          id="last_name" 
          value={formData.last_name}
          onChange={handleChange}
          />
          {errors.last_name && <p>{errors.last_name}</p>}
          <Input 
          type="text" 
          placeholder="Email" 
          id="email" 
          value={formData.email}
          onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
          <Input 
          type="password" 
          placeholder="Password" 
          id="password" 
          value={formData.password}
          onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
          <Input 
          type="password" 
          placeholder="Confirm password" 
          id="confirm_password" 
          value={formData.confirm_password}
          onChange={handleChange}
          />
          {errors.confirm_password && <p>{errors.confirm_password}</p>}
          <Input 
          type="text" 
          placeholder="Country" 
          id="country" 
          value={formData.country}
          onChange={handleChange}
          />
          {errors.country && <p>{errors.country}</p>}
          <Input 
          type="text" 
          placeholder="Zip code" 
          id="zip_code" 
          value={formData.zip_code}
          onChange={handleChange}
          />
          {errors.zip_code && <p>{errors.zip_code}</p>}
          <Input 
          type="text" 
          placeholder="Phone number" 
          id="phone_number" 
          value={formData.phone_number}
          onChange={handleChange}
          />
          {errors.phone_number && <p>{errors.phone_number}</p>}
          <button onClick={actions.handleValidateForm}>Sign up</button>
        </form>
);
