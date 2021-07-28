import React from "react";

const Select = ({ name, label, options,optionName,error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={optionName} {...rest} className="form-control">
        <option value="" />
        {options.map(option => (
          <option key={option[name]} value={option[name] } text={option[optionName]}>
            {option[optionName]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
