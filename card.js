import React from "react";
import "./../../App.css";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VersionForm from './../versions/versionUpdateForm';

const CreateCard = (props) => {

  return (
    <Card className="product-card d-flex flex-row">
      <Card.Img
            className="card-img m-auto p-2"
            variant="top"
            src={props.img}
            //src="https://deplomatic-ui.s3.amazonaws.com/assets/logo/repopro.png"
      />
      <Card.Body> 
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" >
          {/* <span className="versionNumberDisplay">v1.0</span> |  */}
          
            {props.subtitle === 'Ready to Launch' ?
            <span className="statusLabel launchLabel">{props.subtitle}</span> :
            props.subtitle === 'Stopped' || props.subtitle === 'Stopping'  ? 
            <span className="statusLabel stoppedLabel">{props.subtitle}</span>
          : props.subtitle === 'Running' ? 
          <span className="statusLabel runningLabel">{props.subtitle}</span>
          : props.subtitle === 'InProgress' || props.subtitle === 'InQueue' ? 
          <span className="statusLabel inprogressLabel">{props.subtitle}</span>
          : <span className="statusLabel noLabel">{props.subtitle}</span>
  }
        </Card.Subtitle> 
        <Card.Text className="pt-1">{props.content}</Card.Text>
        {/* <Card.Text className="pt-1">Automaton is primarily designed as a tool for software testing automation. With this single tool, engineering teams can test mobile and web applications, REST and SOAP APIs as well as Logs and DB’s of any type. This tool has a built-in reporting module that can generate snapshots of the screens, logs, DB entries and API responses.</Card.Text> */}
        <Card.Link href={props.url}>Know more...</Card.Link>
        { 
        props.applicationUrl !== " " ? <Card.Text className="pt-2 mb-1"><strong>Application Url - </strong><a href={props.applicationUrl}>{props.applicationUrl}</a></Card.Text> 
        : <Card.Text className="pt-0"></Card.Text>
      }
        <Card.Text className="mb-0">{props.username}</Card.Text>
        <Card.Text className="mb-0">{props.password}</Card.Text>
      </Card.Body>
      <Card.Body className="align-self-center">
        {props.button}
        <div className=" btn-wrap" style={{ cursor: "pointer" }}>
          {/* <Button variant="link" onClick={console.log("deleted")}><DeleteIcon/></Button> */}
          <Button variant="link" onClick={console.log("deleted")}></Button>
          {/* <VersionForm 
            label={<EditIcon/>} 
            key={props.key} 
            btl-label="update"
            post={props.post}
          /> */}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CreateCard;
