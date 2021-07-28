import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./../../App.css";

const Breadcrumbs = (props) => {
 
  return (
    <Breadcrumb className="breadcrumbs justify-content-end">
      {/* <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item> */}
      {props.breadcrumbs.map((breadcrumb)=>(<Breadcrumb.Item href={breadcrumb.link}>{breadcrumb.name}</Breadcrumb.Item>))}
  {/* <Breadcrumb.Item href="#">{props.name}</Breadcrumb.Item> */}
      {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
    </Breadcrumb>
  );
};
export default Breadcrumbs;
