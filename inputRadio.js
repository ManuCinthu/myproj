import React, { useState } from "react";
import "./../../App.css";
import Spacer from 'react-add-space';
import { Container, Row } from "react-bootstrap";



const InputRadio = ({ label, name, name1, name2, value1, value2, type, label1, label2, e, onChangefunction, ...rest }) => {
  const [showComponent1, setshowComponent1] = useState(false);
  const [showComponent2, setshowComponent2] = useState(false);
  const { fileName } = useState([]);
   let file = null;
  //  var fileName = document.getElementById('file').files[0].name;
   file = fileName 
      ? ( <span style="font-weight: 700; font-size: 12px !important; color: rgb(171, 147, 100);">File Selected - {fileName}</span>) 
      : ( <span
         id="123"
         
       
        >File Selected - {fileName}</span> );
  // file = fileName 
  // ? ( <span><div><label htmlFor="Product Doc Name">Product Doc Name</label></div> 
  //    <div><input type="text" className="form-control" value={fileName}/></div> 
  //     </span>) 
  //   : ( <span>Choose a file...</span> );
  return (
    <div className="p-4 lp-0 border-bottom input-group ">
      <label htmlFor={label}>{label}</label>
      {/* <Spacer amount={2} /> */}
      <div className="form-group">
      <input
        type={type}
        name={name}
        className=""
        style={{ cursor: "pointer" }}
        checked={value1}
        onChange={() => { setshowComponent2(false) }}
        onClick={() => { setshowComponent1(true)}}
      /> <label htmlFor={label1}>{label1}</label></div>
      {/* <Spacer amount={2} /> */}
      <div className="form-group">
      <input
        type={type}
        name={name}
        className=""
        style={{ cursor: "pointer" }}
        checked={value2}
        onChange={() => { setshowComponent1(false) }}
        onClick={() => { setshowComponent2(true)}}
        
      /><label htmlFor={label2}>{label2}</label></div>
      <Spacer amount={2} />
      {showComponent1 == true &&
        (<div >
          <input
            {...rest}
            defaultValue={value1}
            name={name1}
           
            type="text"
            className="form-control"
            placeholder="Url"
            onChange={onChangefunction}
          />
        </div>)}
      <Spacer amount={2} />
      {showComponent2 == true &&
        (<div >
          <input
            {...rest}
            id="file"
            type="file"
            name={name2}
            defaultValue={value2}
            //title={value3}
            className="form-control border-0 bg-0"
          />
           <label htmlFor="file" id="123">{file}</label>
        </div>)}
    </div>
  );
};

export default InputRadio