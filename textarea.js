import React from "react";
import "./../../App.css";

const TextArea = ({ name, label, error,value, ...rest }) => {
  return (
    <div className="form-group">
      <label for={label}>{label}</label>
     
      <textarea
        {...rest}
        value={value}
        name={name}
        id={name}
        className="form-control"
        placeholder={label}
        
        
      />
        
        {error && <div className="alert alert-danger">{error}</div>}  
     
    </div>
  );
};



export default TextArea;
