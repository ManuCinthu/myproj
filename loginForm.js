import React from "react";
import Joi from "joi-browser";
import Form from "./../common/form";
import { login } from "../../services/authService";
import JSEncrypt from "jsencrypt";
import config from "../../config.json";
import { withRouter } from "react-router-dom";
import {  toast } from 'react-toastify';

class LoginForm extends Form {
  state = {
    posts: [],
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().alphanum().required().label("Username"),
    password: Joi.string()
      .required()
      .min(7)
      .trim()
      .label("Password")
      // .regex(
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "requirment it should have atleast a special character, a capital letter and a number"
      // )
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = "Value should not be empty!";
              break;
            case "string.min":
              err.message = `Value should have at least ${err.context.limit} characters!`;
              break;
            default:
              err.message = `Credentials doesn't match`;
              break;
          }
        });
        return errors;
      }),
  };
  doChange(){}

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const credentials = {
        username: data.username,
        password: data.password,
      };
      const textEncrypt = JSON.stringify(credentials);
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(config.publicKey);
      const encryptedText = encrypt.encrypt(textEncrypt);
     await login(encryptedText);
      sessionStorage.setItem("data", encryptedText);
      this.props.history.replace('/dashboard'). 

      this.props.history.push("/dashboard");
    } catch (ex) {
      // if (ex.response && ex.response.status === 400) {
      //   const errors = { ...this.state.errors };
      //   errors.username = ex.response.data;
      //   this.setState({ errors });
      // }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInputPassword("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
