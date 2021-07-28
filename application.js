import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApplicationTable from "./applicationTable";
import { getApplication } from "../../services/dataServices";
import Navbar from '../../global/navbar/navbar';
import Header from '../../global/header/header';
import Breadcrumbs from "../common/breadcrumbs";
import ApplicationForm from "./applicationForm";
import LoadingSpinner from '../common/loading';	
import Heading from "../common/heading";
import { Redirect } from 'react-router-dom';
import CookieService from '../../services/cookieService';
import "./application.css";
import {  toast } from 'react-toastify';
import { TrendingUpOutlined } from "@material-ui/icons";
const cookieService = CookieService.getService();


class GetPost extends Component {

  state = {
    posts: [],
    data: {
      _id: "",
      applicationName: "",
      desc: "",
    },
    loading: TrendingUpOutlined,
    nodata: false,
    reload: false
  };

  breadcrumbs=[{name:"Home", link:"/dashboard"},{name:"Applications"}]

  async componentDidMount() {
    const { data: post } = await getApplication();
    try{
        if(post.data.listAllApplications === []){
          this.setState({
            nodata: true
          });
        } else {
    this.setState({
      posts: post.data.listAllApplications.map((post) => {
        return { ...post };
      }), loading: false, nodata: false
    });
  }}catch(error){
    if(post){
    toast(post.errors[0].extensions.classification);
    console.log(post.errors[0].extensions.classification)
    }
  }
  }

  doChange(){ }

  handleDelete = (post) => {
    console.log("Delete", post);
  };
  handleUpdate=()=>{
    this.componentDidMount()
  }
  
  handleView = ()=>{
    this.props.history.push("/versions");
  }

  render() {
    if (!cookieService.isLoggedIn()) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        {this.state.nodata ?  
        <div className="home">
          <Header />  
          <div className="root"> <Navbar /> </div>    
        </div>:
        <div className="home">
          <Header />
          <div className="root"> {" "}
            <Navbar />
            <div className="mainContainer">
              <Breadcrumbs breadcrumbs={this.breadcrumbs}/>
              <div>
              <div className="clearfix">
                <div className="float-left"><Heading headingName="Applications"/></div>
                
                {this.state.nodata ? <div className="alert alert-secondary text-center m-3 pt-3 pb-3" role="alert">
                        There are no Applications to display !
                 </div>:
                <div className="float-right pr-3">
              <Link to={`/applicationForm/new`} className="btn btn-primary"> <i className="fa fa-plus pr-2"> </i>New Application</Link>
               </div>}
                </div>
                {this.state.loading ? <LoadingSpinner /> : 	
                <div className="row justify-content-center">
                <ApplicationTable
                  data={this.state.posts}
                  onDelete={this.handleDelete}
                  onUpdate={this.handleUpdate}
                  onView ={this.handleView}
                />
                </div>}
              </div>
            </div>
          </div>
        </div>}
      </React.Fragment>
    );
  }
}

export default GetPost;
