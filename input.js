import React from "react";
import "./../../App.css";

const Input = ({ name, label, error,accept,value, ...rest }) => {
  return (
    <div className="form-group">
      <label for={label}>{label}</label>
     
      <input
        {...rest}
        value={value}
        name={name}
        id={name}
        accept={accept}
        className="form-control"
        placeholder={label}
        />
        
        {error && <div className="alert alert-danger">{error}</div>}  
     
    </div>
  );
};



export default Input;
