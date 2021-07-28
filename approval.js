import React, { Component } from "react";
import { getApproval } from "../../services/dataServices";
import Navbar from '../../global/navbar/navbar';
import Header from '../../global/header/header';
import Breadcrumbs from "../common/breadcrumbs";
import ApprovalTable from "./approvalTable.js";
import Heading from "../common/heading";
import { TrendingUpOutlined } from "@material-ui/icons";
import { Redirect } from 'react-router-dom';
import CookieService from '../../services/cookieService';
const cookieService = CookieService.getService();

class Approval extends Component {

  state = {
    posts: [],

    loading: TrendingUpOutlined,
    nodata: false
  };

  breadcrumbs=[{name:"Home", link:"/dashboard"},{name:"Approvals"}]

   async componentDidMount() {
    const { data: post } = await getApproval();
           this.setState({
          posts: post.data.listAllPendingApproval.map((post) => {
            return { ...post };
          })
        });
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
                <div className="root"> <Navbar />
                </div>
            
           </div>:
        
          <div className="home">
            <Header />
            <div className="root">
              <Navbar />
              <div className="mainContainer">
                <Breadcrumbs breadcrumbs={this.breadcrumbs} />
                
                <div><Heading headingName="Approvals" />
                    {this.state.posts.length===0 ? <div class="alert alert-secondary text-center m-3 pt-3 pb-3" role="alert">
                      There are no Pending Approvals to display !
                    </div> :
                    <div className="row justify-content-center">
                        <ApprovalTable
                          data={this.state.posts}
                          onUpdate={this.handleUpdate}
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

export default Approval;
