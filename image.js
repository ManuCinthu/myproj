import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Breadcrumbs from "./../common/breadcrumbs";
import Navbar from './../../global/navbar/navbar';
import Header from './../../global/header/header';
import LoadingSpinner from './../common/loading';
import Heading from "../common/heading";
import { getallimages } from './../../services/dataServices';
import ImageTable from "./imageTable";

class Images extends Component {
  constructor(props) {
    super(props)
    this.state = {
    posts: [],
    loading: false
  };
}
  breadcrumbs=[{name:"Home", link:"/dashboard"},{name:"Images"}]

async componentDidMount() {
  const { data: post } = await getallimages();
         this.setState({
        posts: post.data.getAllImages.map((post) => {
          return { ...post };
          
        }
        )
       
      });
      console.log(this.state.posts);
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
                        <div><Heading headingName="Images" />
                        {this.state.loading ? <LoadingSpinner /> : 
                        <div className="clearfix">
                            <div className="float-right pr-3" style={{ width: '20rem' }}>
                            <Link to="/imageForm/new" className="btn btn-primary">Create Image</Link></div>
                            </div>}
                            {this.state.loading ? <LoadingSpinner /> : 	
                <div className="row justify-content-center">
                 <ImageTable
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

export default Images;
