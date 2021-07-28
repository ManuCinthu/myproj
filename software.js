import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Breadcrumbs from "./../common/breadcrumbs";
import Navbar from './../../global/navbar/navbar';
import Header from './../../global/header/header';
import LoadingSpinner from './../common/loading';
import Heading from "../common/heading";
// import {  toast } from 'react-toastify';
import { getallSoftware } from './../../services/dataServices';
import SofwareTable from "./softwareTable.js";


class Software extends Component {
  constructor(props) {
    super(props)
    this.state = {
    posts: [],
    loading: false
  };
}
  breadcrumbs=[{name:"Home", link:"/dashboard"},{name:"Software"}]

  
  async componentDidMount() {
    const { data: post } = await getallSoftware();
    this.setState({
      posts: post.data.Softwares.map((post) => 
      {return { ...post };}), loading: false});
}

doUpdate = ()=> {
 this.componentDidMount()
};

  render() {
    return (
      <React.Fragment>
        <div className="home">
            <Header />  
           
                <div className="root"> <Navbar />
                    <div className="mainContainer">
                     <Breadcrumbs breadcrumbs={this.breadcrumbs}/>
                        <div><Heading headingName="Software" />
                        {this.state.loading ? <LoadingSpinner /> : 
                        <div className="clearfix">
                            <div className="float-right pr-3"  style={{ width: '35rem' }}>
                            <Link to="/softwareForm/new" className="btn btn-primary">Create Software</Link></div>
                        </div>}
                        {this.state.loading ? <LoadingSpinner /> : 	
                <div className="row justify-content-center">
                 <SofwareTable
                 data={this.state.posts}
                 onUpdate={this.doUpdate}
                  />
                </div>}
                     </div>
                     </div>      
                 </div>
          </div> 
      </React.Fragment>
    );
  }
}

export default Software;
