import React from "react";
import "./InputGroup.css"

const InputGroup = ({ label, type, value, onChange }) => {
    return (
        <div className="input-group">
            <input
                type={type || 'text'}
                value={value}
                onChange={onChange}
                className="input-field"
            />
            <label>{label}</label>
        </div>
    );
}
export default InputGroup