import React, { Component } from "react";
import "./../../App.css";
import LoginForm from "./loginForm";
import "bootstrap/dist/css/bootstrap.css";
import termofuse from "./termsofuse";
import DialogBox from "../common/dialogBox";
import "./login.css";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import CookieService from '../../services/cookieService';
import RegisterForm from "./register";
import Spacer from 'react-add-space';
import Button from "react-bootstrap/Button";



const cookieService = CookieService.getService();
const cookies = new Cookies();
class LoginPage extends Component {
  constructor(props){
    super(props);
   
  }
  
  render() {
    if (cookieService.isLoggedIn()) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 px-0 d-none d-sm-block login-banner"></div>
          <div className="login-section-wrapper col-sm-6 w-100">
            <center>
              <div className="brand-wrapper">
                <img
                  src="https://deplomatic-ui.s3.amazonaws.com/assets/logo/deplo_logo_light_bg.svg"
                  alt="logo"
                  className="logo"
                  height="37px"
                />
              </div>
            </center>
            <Spacer amount={3} />
            <div >
              <h4 className="text-secondary font-weight-bold text-left">
                Login to your account
              </h4>
              {<LoginForm />}
              <Spacer amount={1}/>
              <div>
             <RegisterForm
                label="Register"
                title="Register"
                variant="info"
                className="btn btn-info form-control"
              />
              </div>
              <DialogBox
                variant="link"
                classname="login-link"
                intro="By continuing, you agree to Deplomatic's "
                label="Term of use"
                title="Term of use"
                body={termofuse}
                button="I understand"
              />
              <Spacer amount={3} />
            </div>
            <div className="w-100">
              <p className="d-flex justify-content-center align-items-center">
                <span className="p-2 lp-highlights">Product of</span>
                <img
                  alt=""
                  height="20px"
                  src="https://deplomatic-ui.s3.amazonaws.com/assets/logo/this_logo_light_bg.svg"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;
