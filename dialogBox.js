import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


const DialogBox = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);
  

  return (
    <div className="dialogBox">
      {props.start}
      <div onClick={props.update}>{props.intro}
      {/* condition to check the button or link */}
      {props.variant ==="button" || props.variant === "info"|| props.variant === "delete"  || props.variant === "primary" ||props.variant === "link"?
       <Button size={props.size} variant={props.variant} onClick={handleShow} className={props.classname}>
       {/* condition to check the primary button to add plus icon */}
       {props.variant === "primary" ? <i className="fa fa-plus pr-2"> </i>: <i></i> }
       {/* condition to check the primary button to add plus icon */}
       {props.variant === "info" ? <i className="fa fa-edit"> </i>: <i></i> }
       {props.variant === "delete" ? <i className="fa fa-times">  </i>: <i></i> }
       {props.variant ==="link"?<i/>:<i/>}
      {props.label}
      </Button> : 
      <div className="dropdown-item" onClick={handleShow}>
      <i className="fa fa-user " style={{"font-size": "1rem"}}></i><span className="profileSpan">{props.label}</span>
      </div> 
      }</div>
      <Modal show={show} onHide={handleClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p1" >
          <strong>{props.body} </strong></Modal.Body>
        <Modal.Footer onClick={()=>{setShow(props.show)}}>
        {props.footer }
          {/* condition to check if more buttons are required || Cancel button  */}
          {props.button ? 
          <Button variant="primary" onClick={()=>{handleClose()}}>
            {props.button}
          </Button> : 
          <span></span>}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DialogBox;
