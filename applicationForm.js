import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import Button from "react-bootstrap/Button";
import {getApplicationbyId,listallusers,createApplication,updateApplication,getversions, gettemplate, getversionbyId} from "../../services/dataServices";
import { Multiselect } from 'multiselect-react-dropdown';
import Header from "../../global/header/header";
import Navbar from "../../global/navbar/navbar";
import { Row,Col } from "react-bootstrap";
import Breadcrumbs from "../common/breadcrumbs";
import SectionForm from "../common/sectionForm";
import Preview from "../common/preview";
import Heading from "../common/heading";

let users = [];


class ApplicationForm extends Form {
  state = {
    posts: [],
    templates: [],
    showModal: false,
    enableApp:true,
    enableVersion:true,
    enableScript:true,
    data: {
      _appid: this.props.match.params.id,
      applicationName: "",
      applicationDescription: "",
      cpuLimit: "",
      ramLimit: "",
      storageLimit: "",
      applicationDocUrl:"",
      applicationIconUrl:"",
      versionName: "",
      applicationTemplateId: parseInt(""),
      userId: parseInt(""),
      createdBy: "",
    },
    applicationVersionDeliverables: null,
    deploymentScript: null,
    postDeploymentScript: null,
    upgradeScript: null,
    rollbackScript: null,
    applicationDocFile:null,
    applicationIcon:null,
    user: [],
    template: [],
    errors: {}
 };
  
  schema = {
    _id: Joi.string(),
    applicationName: Joi.string().required().label("Application Name"),
    applicationDescription: Joi.string().required().min(0).max(450).label("Description"),
    cpuLimit: Joi.number().required().min(0).max(100).label("CPU Limit"),
    ramLimit: Joi.number().required().min(0).max(10000).label("RAM Limit"),
    storageLimit: Joi.number().required().min(0).max(1000).label("Storage Limit"),
    applicationTemplateId: Joi.required().label("template"),
    versionName: Joi.string().required().label("Version Name"),
    createdBy:Joi.string().label("created by"),
    userId:Joi.label("userId"),
    applicationDocUrl:Joi.string().min(0).max(450).label("applicationDocUrl"),
    applicationIconUrl:Joi.string().min(0).max(450).label("application Icon Url"),
  };

  breadcrumbs=[{name:"Home", link:"/dashboard"},{name:"Application", link:"/application"},{name:"Application Form"}]

  steps= ['Application Details', 'Version Details', 'Upload Scrips','Preview'];

  section=[{id:1,item:()=>this.application()},{id:2,item:()=>this.version()},{id:3,item:()=>this.scripts()},{id:4,item:()=>this.preview()}]
  //  preview=[{label:"application details",item:()=>this.application()},{label:"version",item:()=>this.application()},{label:"Scrips",item:()=>this.application()}]


  async componentDidMount() {
    const { data: templates } = await gettemplate();
    this.setState({ template: templates.data.getAllApplicationTemplate })
    const { data: post } = await listallusers();
    this.setState({
      posts: post.data.getUsers.map((post) => {
        return { ...post };
      }), loading: false
    });
    if (this.props.match.params.id === "new") return;
    const { data: getAppbyId } = await getApplicationbyId(this.props.match.params.id);
    console.log(getAppbyId)
      const app = getAppbyId.data.getApplicationById;
      console.log(app)
      this.setState({data: this.mapToViewModel(app)});
  }


  mapToViewModel(getAppbyId) {
    return {
      _id: getAppbyId.applicationId,
      applicationName: getAppbyId.applicationName,
      applicationDescription: getAppbyId.applicationDescription,
      cpuLimit:getAppbyId.cpuLimit,
      ramLimit:getAppbyId.ramLimit,
      storageLimit:getAppbyId.storageLimit,
      applicationDocUrl:getAppbyId.applicationDocUrl,
      applicationIconUrl:getAppbyId.applicationIconUrl,

    };
  }

  onSubmit = async () => {
    const { data } = this.state;
    await createApplication(
      data.applicationName,
      data.applicationDescription,
      data.cpuLimit,
      data.ramLimit,
      data.storageLimit,
      data.applicationTemplateId,
      data.versionName,
      this.state.user,
      data.applicationDocUrl,
      data.applicationIconUrl,
      this.state.deploymentScript,
      this.state.postDeploymentScript,
      this.state.upgradeScript,
      this.state.rollbackScript,
      this.state.applicationVersionDeliverables,
      this.state.applicationDocFile,
      this.state.applicationIcon
    );
    this.props.history.replace("/application")
  };

  doUpdate = async () => {
    const { data } = this.state;
     await updateApplication(
       data.applicationName,
      data.applicationDescription,
      data.cpuLimit,
      data.ramLimit,
      data.storageLimit,
      data._id,
      data.applicationDocUrl,
      data.applicationIconUrl,
      this.state.applicationIcon,
      this.state.applicationDocFile
     );
     this.props.history.replace("/application")
  };

  saveButton = () => {
    if (this.props.match.params.id=== "new"){
    return <Button onClick={() => { this.onSubmit() }} className="m-3 float-right">Create</Button>;
  }else{
  // updateButton
    return <Button onClick={() => { this.doUpdate()}} className="m-3 float-right">Update</Button>;}
  };

  selectHandler = () => {
    console.log("event triggered")
  }

  onSelect = (selectedList, selectedItem) => {
    users.push({ userId: parseInt(selectedItem.userId) });
    this.setState({
      user: users
    });
  }

  onRemove = (selectedList, removedItem) => {
    users = users.filter((item) => item.userId !== "" + removedItem.userId);
    this.setState({
      user: users
    });
  }

  doChange(){}

  application = (status) => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            {this.renderInput("applicationName", "Application Name")}
            {this.renderTextArea("applicationDescription", "Description","20")}
            <Row class="lp-0">
              <Col className="lp-0">{this.renderInput("cpuLimit", "CPU Limit","number")}</Col>
              <Col>{this.renderInput("ramLimit", "RAM Limit", "number")}</Col>
              <Col>{this.renderInput("storageLimit", "Storage Limit", "number")}</Col>
            </Row>
            {this.renderRadio("Application Doc","action","applicationDocUrl","applicationDocFile","applicationDocUrl","DocFile","radio", ".doc,.docx,.xml")}
          {this.renderRadio("Application Icon","action1","applicationIconUrl","applicationIcon","applicationIconUrl","IconFile","radio",".jpeg,.png")}
         </form>
      </div>
    );
  }

  version=()=>{
      return(
      <form>
          {this.renderSelect("applicationTemplateId", "Template", this.state.template, "applicationTemplateName")}
          {this.renderInput("versionName", "Version Name")}
          <label name="users" id="Users" >Users</label>
          <Multiselect
            options={this.state.posts} // Options to display in the dropdown
            selectedValues={this.state.selectedValues} // Preselected value to persist in dropdown
            onSelect={this.onSelect} // Function will trigger on select event
            onRemove={this.onRemove} // Function will trigger on remove event
            displayValue="userName" // Property name to display in the dropdown options
            onChange={this.selectHandler} 
            />
      </form>);
  }

  scripts=()=>{
      return(<form>
      <Row>
     <Col>{this.renderFile("deploymentScript", "Deployment Script", "file",".sh")}</Col>
     <Col> {this.renderFile("postDeploymentScript", "Post Deployment Script", "file", ".sh")}</Col>
     </Row>
     <Row>
     <Col> {this.renderFile("upgradeScript", "Upgrade Script", "file")}</Col>
     <Col>{this.renderFile("rollbackScript", "Rollback Script", "file")}</Col>
     </Row><Row>
     <Col>{this.renderFile("applicationVersionDeliverables", "Application Version Deliverables", "file")}</Col>
      </Row>
    </form>
    )
      }
      
      handleEdit=(enable)=>{
        this.setState({[enable]:false})
      }

      preview=()=>{
        return(
          <div className="m-3">
          <Row className="border m-2">
          <Col sm={2}><strong>Application Details</strong></Col>
          <Col sm={8}><fieldset disabled={this.state.enableApp} className=" m-1 p-2">
          {this.application()}
          </fieldset></Col>
          <Col sm={2}><button onClick={()=>this.handleEdit("enableApp")} className="btn btn-light float-right "><i className="fa fa-edit"> </i></button></Col>
          </Row><Row className="border m-2">
          <Col sm={2}><strong>Application Version Details</strong></Col> 
          <Col sm={8}><fieldset disabled={this.state.enableVersion} className="m-1 p-2">
          {this.version()}
          </fieldset></Col>
          <Col sm={2}><button onClick={()=>this.handleEdit("enableVersion")} className="btn btn-light float-right "><i className="fa fa-edit"> </i></button></Col>
          </Row><Row className="border m-2">
          <Col sm={2}><strong>Scripts</strong></Col>
          <Col sm={8}><fieldset disabled={this.state.enableScript} className="m-1 p-3">
          {this.scripts()}
          </fieldset></Col>
          <Col sm={2}><button onClick={()=>this.handleEdit("enableScript")} className="btn btn-light float-right "><i className="fa fa-edit"> </i></button></Col>
          </Row>
          {this.saveButton()}
          </div>
        )
      }

  updateform = () => {
    return (
      <div className="m-5 ">
      {this.application()}
      {this.saveButton()}
      </div>
    );
  };

  renderApplication=()=>{
    if (this.props.match.params.id === "new"){
    return(
      <div>
        <Heading headingName="Add Application"/>
        <SectionForm section={this.section} steps={this.steps}/>
      </div>
    )}
    else{
      return(<div>
        <Heading headingName="Update Application"/>
      {this.updateform()}
      </div>)
    }
  }

  render() {
      return (
        <div className="home">
          <Header/>
          <div  className="root">
            <Navbar/>
            <div className="mainContainer">
            <Breadcrumbs breadcrumbs={this.breadcrumbs}/>
            {this.renderApplication()}
            </div>
          </div>
        </div>
      );
     }
}

export default ApplicationForm;
