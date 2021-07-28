import React from "react";
import { Multiselect } from 'multiselect-react-dropdown';


const MultiSelect = ({ name, label, options,value,onSelect,onRemove,disable,selectedValues,displayValue,onChange,error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Multiselect
        {...rest}
        disable={disable}
        options={options} // Options to display in the dropdown
        selectedValues={selectedValues} // Preselected value to persist in dropdown
        value={value}
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        displayValue={displayValue} // Property name to display in the dropdown options
        onChange={onChange}
    />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default MultiSelect;
