import React from "react";
import { Spinner } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

const LoadingSpinner = () => {
    return (
        <div className="loadingSpinner"><Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner></div>
    );
  };
  export default LoadingSpinner;

