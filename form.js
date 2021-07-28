import React, { Component } from "react";
import Joi, { errors } from "joi-browser";
import Input from "./input";
import InputRadio from "./inputRadio";
import InputFile from "./inputFile";
import Select from "./select";


import  "../login/login.css";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import TextArea from "./textarea";
import MultiSelect from './multiselect';

class Form extends Component {
  state = {
    data: {},
    errors: {},
    name: {},
    value: {},
    name: "",
    fileName: ""

  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validateSelect = (validate,schema) => {
    if(validate == null && schema == null)
    return;
    else{
    const options = { abortEarly: false };
    const { error } = Joi.validate(validate, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;}
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    let data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
    this.doChange(input);
  };




  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-dark form-control">
        {label}
      </button>
    );
  }

  renderMultiSelect(name,label,options,onSelect,onRemove,validate,schema){
    const {data,errors} = this.state;
    return(
    <MultiSelect
    disable={this.validateSelect(validate,schema)}
    options={options} 
    label={label}
    selectedValues={data[name]} 
    value={data[name]}
    onSelect={onSelect}
    onRemove={onRemove}
    displayValue={name} 
    onChange={this.handleChange}
    error={errors[name]}
    /> 
     );
  }

  renderSelect(name, label, options,optionName,validate,schema) {
    const { data, errors } = this.state;

    return (
      <Select
        disabled={this.validateSelect(validate,schema)}
        name={name}
        value={data[name]}
        text={data[name]}
        label={label}
        options={options}
        optionName={optionName}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }


  onFileChange = (e) => {
    const { name } = e.target
    this.setState({ [name]: e.target.files[0] })
  }

  renderRadio(label, name, name1, name2, label1, label2, type, accept, value1, value2) {
    const { data, errors } = this.state;
    //   const [picture, setPicture] = useState(null);
    //   const onChangePicture = e => {
    //     setPicture(URL.createObjectURL(e.target.files[0]) );
    // };
    if (!data[name1])
      data[name1] = value1;
    if (!data[name2])
      data[name2] = value2;
    // if(!data[name3])	
    // data[name3] = value3;

    // file = this.state.fileName 
    // ? ( <span><div><label htmlFor="Product Doc Name">Product Doc Name</label></div> 
    //  <div><input type="text" className="form-control" value={this.state.fileName}/></div> 
    //   </span>) 
    // : ( <span>Choose a file...</span> );
    return (

      <div >
        <InputRadio
          label={label}
          type={type}
          name={name}
          name1={name1}
          name2={name2}


          value1={data[name1]}
          value2={data[name2]}

          accept={accept}
          label1={label1}
          label2={label2}

          onChangefunction={this.handleChange}
          onChange={this.onFileChange}
          error={errors[name1]}
          error={errors[name2]}


        />

  {/* return (
    <div >
      <InputRadio 
      label={label}
      type={type}
      name={name}
      name1={name1}
     name2={name2}
    value1={data[name1]}
    value2={data[name2]}
     accept={accept }
      label1={label1}
     label2={label2}
    // file={file}
    onChangefunction={this.handleChange}
    onChange={this.onFileChange}
      error={errors[name1]}
   error={errors[name2]}
       
     /> */}
   
      </div>
    );
  }

  renderInput(name, label, type, accept, value) {
    const { data, errors } = this.state;
    if (!data[name])
      data[name] = value;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />

    );
  }


  renderTextArea(name, label, row, value) {
    const { data, errors } = this.state
    if (!data[name])
      data[name] = value;

    return (
      <TextArea
        name={name}
        row={row}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}

      />

    );
  }


  renderInputDisabled(name, label, type, accept, value) {
    const { data, errors } = this.state;
    if(!data[name])	
    data[name] = value;
    var typeDisabled
    console.log("type:"+type)
    if(type === "new"){
    typeDisabled = false
    }else{
      typeDisabled = true
    }
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        disabled={typeDisabled}
        label={label}
        accept={accept}
        onChange={this.handleChange}

      />

    );
  }
  renderFile(name, label, type, accept, value) {
    const { data, errors } = this.state;
    if (!data[name])
      data[name] = value;

    return (
      <div >
      <InputFile
        type={type}
        name={name}
        value={data[name]}
        label={label}
        accept={accept}
        onChange={this.onFileChange}
        error={errors[name]}
      />
      </div>

    );
  }

  renderTextArea(name, label, row,value) {
    const { data, errors } = this.state
    if(!data[name])	
    data[name] = value;

    return (
      <TextArea
        name={name}
        row={row}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        
      />
      
    );
  }
 

  togglePassword=event=>{
    this.setState({isRevealPassword:!this.state.isRevealPassword});
  }

  renderInputPassword(name, label, type, value) {
    const { data, errors, isRevealPassword } = this.state;
    if (!data[name])
      data[name] = value;

    return (
      <div>
        <div style={{ 'position': 'relative' }}>
          <Input
            type={isRevealPassword ? "text" : "password"}
            name={name}
            value={data[name]}
            label={label}
            onChange={this.handleChange}
            error={errors[name]}
          />
          <span onClick={this.togglePassword} ref={this.iconRevealPassword}>
            <span>
              {isRevealPassword ?

                <FontAwesomeIcon icon={faEye} className="customIcon" /> :
                <FontAwesomeIcon icon={faEyeSlash} className="customIcon" />
              }
            </span>
          </span>
        </div>
      </div>


    );
  }


}

export default Form;
