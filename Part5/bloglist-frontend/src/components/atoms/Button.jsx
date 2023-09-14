import React from "react";
import "./button.css"

const Button = ({type,msg}) => {
    return(
        <button type={type} className="btn">{msg}</button>
    )
}

export default Button