import React from "react";
import "./InputGroup.css"

const InputGroup = ({ label, type, value, onChange, htmlFor, id }) => {
  return (
    <div className="input-group">
      <input
        type={type || 'text'}
        value={value}
        onChange={onChange}
        id={id}
        name={id}
        className="input-field"
      />
      <label  htmlFor={htmlFor} >{label}</label>
    </div>
  );
}
export default InputGroup