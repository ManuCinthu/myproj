import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import DialogBox from "../common/dialogBox";
import Button from "react-bootstrap/Button";
import {createMachine,getMachineTypebyId,updateMachine} from "../../services/dataServices";
import Heading from "../common/heading";
import Navbar from "../../global/navbar/navbar";
import Header from "../../global/header/header";
import Breadcrumbs from "../common/breadcrumbs";

class CreateMachine extends Form {
  state = {
    posts: [],
    data: {
      _id: this.props.machineTypeId,
        machineTypeName:"",
        ram:"",
        storage:"",
        cpu:"",
    },
    errors: {},
  };
  breadcrumbs=[{name:"Home", link:"/dashboard"},{name:"Machine", link:"/machineType"},{name:"create machine type"}]


  schema = {
    _id:Joi.string(),
    machineTypeName: Joi.string().required().min(0).max(450).label("Machine Name"),
    ram: Joi.string().required().min(0).max(450).label("RAM"),
    storage: Joi.string().required().min(0).max(450).label("Storage"),
    cpu :Joi.string().required().min(0).max(450).label("CPU"),
  };

 async componentDidMount(){
    if (this.props.match.params.id === "new") return;
    else{
      const { data: getMachinebyId } = await getMachineTypebyId(this.props.match.params.id);
      const app = getMachinebyId.data.getMachineTypeById;
      console.log(app)
      this.setState({data: this.mapToViewModel(app)})};
  }
 
  mapToViewModel(getMachinebyId){
    return {
      _id: getMachinebyId.machineTypeId,
      machineTypeName: getMachinebyId.machineTypeName,
      storage: getMachinebyId.storage,
      cpu:getMachinebyId.cpu,
      ram:getMachinebyId.ram
    };
  }

//doSubmit function is called when create new machine is trigger ,called from handleSubmit in common form.
  doSubmit = async () => {
    const { data } = this.state;
    await createMachine(data.machineTypeName,data.storage,data.cpu,data.ram);
    this.props.onUpdate()
  };

  doUpdate = async () => {
    const { data } = this.state;
    await updateMachine(data._id,data.machineTypeName,data.ram,data.cpu,data.storage);
    this.props.onUpdate()
  };
 
//checking for create or update button to render.
  createButton = () => {
    if(this.props.match.params.id === "new"){
    return( <form onSubmit={this.handleSubmit}>{this.renderButton("Save")}</form>)}
    else{return (<Button className="btn btn-dark form-control" onClick={this.doUpdate}>Update</Button>)}
    ;
  };
  doChange(){}

  form = () => {
    return (
      <div className ="m-4">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("machineTypeName", "Machine Type Name")}
          {this.renderInput("ram", "Required RAM")}
          {this.renderInput("storage", "Required Storage")}
          {this.renderInput("cpu", "Number of CPUs")}
        </form>
      </div>
    );
  };

  render() {
    return (
      <div className="home">
      <Header/>
      <div  className="root">
        <Navbar/>
        <div className="mainContainer">
        <Breadcrumbs breadcrumbs={this.breadcrumbs}/>
        {this.form()}
        {this.createButton()}
        </div>
      </div>
    </div>
    );
  }
}
export default CreateMachine;
