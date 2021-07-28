import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const GridBox = (props) => {
  const [lgshow, setLgShow] = useState(false);

  const handleClose = () => setLgShow(false);
  const handleLgShow = () => setLgShow(true);
 // const [lgShow, setLgShow] = useState(false);
 //dialogClassName="modal-90w"
  return (
    <div className="dialogBox">
      <div onClick={props.update} >
      {props.start}
      {/* condition to check the button or link */}
      {
      props.variant ==="button" || props.variant === "info" || props.variant === "primary" ?
       <Button size={props.size} variant={props.variant} onClick={handleLgShow}>
       {/* condition to check the primary button to add plus icon */}
       {props.variant === "primary" ? <i class="fa fa-plus pr-2"> </i>: <i></i> }
       {/* condition to check the primary button to add plus icon */}
       {props.variant === "info" ? <i class="fa fa-edit"> </i>: <i></i> }

    
      {/* </Button><Button className={props.className} size={props.size} variant={props.variant} onClick={handleShow}> */}
      {props.label}
      </Button> :  
      <a href="#" className={props.className} onClick={handleLgShow}>
        {props.label}
      </a>
      }
      </div>
      <Modal size="lg"
        show={lgshow}
        onHide={() => setLgShow(false)}
      onHide={handleClose}  scrollable 
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
        {props.footer ?
        <Button variant="primary-0" onClick={()=>{handleClose()}} >
         {props.footer} 
           </Button>:
           <span></span>}
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

export default GridBox;
