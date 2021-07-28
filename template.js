import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Breadcrumbs from "./../common/breadcrumbs";
import Navbar from './../../global/navbar/navbar';
import Header from './../../global/header/header';
import LoadingSpinner from './../common/loading';
import Heading from "../common/heading";
import {  toast } from 'react-toastify';
import { gettemplate } from './../../services/dataServices';


class Template extends Component {
  state = {
    posts: [],
    loading: true
  };
  breadcrumbs=[{name:"Home", link:"/dashboard"},{name:"Application Templates"}]

  
 async componentDidMount() {
    const {data : post} = await gettemplate();
    this.setState({
      posts: post.data.getAllApplicationTemplate, loading: false
    });
  }

  handleUpdate = (post) => {
    console.log("Update", post);
  };

  handleDelete = (post) => {
    console.log("Delete", post);
  };

  createCard = (post) => {
    return (
      <Card className="p-3 m-3" style={{ width: '18rem' }}>
      <Card.Title className="d-flex">{post.applicationTemplateName} 
      <Button variant ="light"
          onClick={() => this.handleDelete(post)}
          className="ml-auto btn-sm" data-toggle="tooltip" data-placement="bottom" title="Delete"
        >
          <i className="fa fa-times"></i>
        </Button>
        <Button variant ="light"
          onClick={() => this.handleUpdate(post)}
          className="ml-auto btn-sm" data-toggle="tooltip" data-placement="bottom" title="Edit">
          <i className="fa fa-edit"></i>
        </Button>
        </Card.Title>
      
          <Card.Body>
            {/* <Card.Text>Product: {post.product.productName}</Card.Text> */}
              <Card.Text>Number Of Components: {post.noOfComponents}</Card.Text>
              <Card.Text>Number Of Machines:  {post.noOfMachines}</Card.Text>
          </Card.Body>
      </Card>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="home">
            <Header />  
                <div className="root"> <Navbar />
                    <div className="mainContainer">
                     <Breadcrumbs breadcrumbs={this.breadcrumbs}/>
                        <div><Heading headingName="Application Templates" />
                        {this.state.loading ? <LoadingSpinner /> : 
                        <div className="row ml-5">
                            <div className="m-3 p-3" style={{ width: '18rem' }}>
                            <Link to="/templateForm" className="btn btn-primary">Create Template</Link><h6>New Application Template</h6></div>
                            {this.state.posts.map(this.createCard)}
                        </div>}
                     </div>
                     </div>      
                 </div>
          </div> 
      </React.Fragment>
    );
  }
}

export default Template;
