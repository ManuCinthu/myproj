import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMachineTypeslist,updateMachine,getMachineTypebycloudId } from "../../services/dataServices";
import Navbar from '../../global/navbar/navbar';
import Header from '../../global/header/header';
import Breadcrumbs from "../common/breadcrumbs";
import MachineTable from "./machineTable.js";
import LoadingSpinner from './../common/loading';	
import Heading from "../common/heading";
import CreateMachine from "./createmachineForm";
import { Redirect } from 'react-router-dom';
import CookieService from '../../services/cookieService';
import { TrendingUpOutlined } from "@material-ui/icons";

const cookieService = CookieService.getService();

class Machine extends Component {  
  constructor(props) {
    super(props)
   this.state = {
    requiredItem: 0,
    posts: [], 
    loading: TrendingUpOutlined,
    
  };  
}

breadcrumbs=[{name:"Home", link:"/dashboard"},{name:"Machine Types"}]


 async componentDidMount() {
    const { data: post } = await getMachineTypeslist();
    this.setState({
      posts: post.data.listAllMachinesTypes.map((post) => 
      {return { ...post };}), loading: false});
}

doUpdate = ()=> {
 this.componentDidMount()
};


 render() {
  if (!cookieService.isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  const requiredItem = this.state.requiredItem;
   let modalData = this.state.posts[requiredItem];
    return (
      <React.Fragment>
        <div className="home">
          <Header />
          <div className="root">
            {" "}
            <Navbar />
            <div className="mainContainer">
              <Breadcrumbs breadcrumbs={this.breadcrumbs}/>
              <div>
              <div className="clearfix">
                <div className="float-left"><Heading headingName="Machine Types"/></div>
                {this.state.loading ? <div className="float-right pr-3"></div> : 
                <div className="float-right pr-3">
                {/* <CreateMachine
                label="New Machine Type"
                variant="primary"
                size="sm"
                title="Add Machine Type"
                post="new"
                onUpdate={this.doUpdate}/> */}
                <Link to={`/machineForm/new`} className="btn btn-primary"> <i className="fa fa-plus pr-2"> </i>New Machine Type</Link>
                </div>}
                </div>
                {this.state.loading ? <LoadingSpinner /> : 	
                <div className="row justify-content-center">
                 <MachineTable
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
export default Machine;
