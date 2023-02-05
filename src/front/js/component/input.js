import React, { useState } from "react";

export const Input = (props) => {
    const [inputValue, setInputValue] = useState("")

    const handleOnChange = () => {

    }
    return (
        <input 
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        required
        />
    )
}