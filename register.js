import React from "react";
import Joi from "joi-browser";
import Form from "./../common/form";
import DialogBox from "../common/dialogBox";
import Button from "react-bootstrap/Button";



class RegisterForm extends Form {
  state = {
    posts: [],
    data: {
    userName:'',
    email:'',
    phoneNumber:'',
    firstName:'',
    lastName:'',
    middleName:'' },
    errors: {},
  };
  handleEntailmentRequest(e){
    e.preventDefault();
    console.log(this.state)


}

  schema = {
    userName: Joi.string().alphanum().required().label("Username"),
    email: Joi.string().required().label("email"),
    phoneNumber: Joi.number().label("Phone Number"),
    firstName: Joi.string().alphanum().required().label("First Name"),
    lastName: Joi.string().alphanum().required().label("Last Name"),
    middleName: Joi.string().alphanum().required().label("MiddleName"),
  };

  RegisterButton = () => {
    return <Button onClick={(e)=>this.handleEntailmentRequest(e)}>Register</Button>;
  };

label=()=>{
  return <label>Register</label>
}
doChange(){}

  updateform = () => {
    return (
    
      <div>
        <form onSubmit={this.handleEntailmentRequest}>
          {this.renderInput("userName", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderInput("phoneNumber", "Phone Number", "Phone Number")}
          {this.renderInput("firstName", "FirstName", "First Name")}
          {this.renderInput("lastName", "LastName", "last Name")}
          {this.renderInput("middleName", "MiddleName", "Middle Name")}
         
        </form>
      </div>
    );
  }

  render() {
    return (
      <DialogBox
        variant={this.props.variant}
        size={this.props.size}
        label={this.props.label}
        title={this.props.title}
        className={this.props.className}
        body={this.updateform()}
        footer={this.RegisterButton()}
      />
    );
  }

}

export default RegisterForm;
