import React from "react";
import "./../../App.css";

const InputFile = ({ name, label, error,accept,value, ...rest }) => {
  return (
    <div className="form-group border-bottom p-3">
      <label for={label}>{label}</label>
     
      <input
        {...rest}
        value={value}
        name={name}
        id={name}
        accept={accept}
        className="form-control border-0 bg-0"
        placeholder={label}
        />
        
        {error && <div className="alert alert-danger">{error}</div>}  
     
    </div>
  );
};



export default InputFile;
