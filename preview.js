import React , { useState } from "react";
import { Row,Col } from "react-bootstrap";


const Preview=(props)=>{
    const [enable, setenable] = useState(true);
    // const preview=[{label:"application details",item:()=>application()},{label:"version",item:()=>application()},{label:"Scrips",item:()=>application()}]
const application=()=>{return(<h1>hello world</h1>)}

    const handleEdit=()=>{setenable(false)}

    return ( <div>
         {props.previews.map((p) => (
            <Row className="border m-2">
          <Col sm={2}><strong>{p.label}</strong></Col>
          <Col sm={8}><fieldset disabled={enable} className=" m-1 p-2">
          {p.item()}
          </fieldset></Col>
          <Col sm={2}><button onClick={handleEdit} className="btn btn-primary float-right ">edit</button></Col>
          </Row>
        ))}
    </div>);
}
export default Preview;