import React from "react";
import Joi from "joi-browser";
import Col from 'react-bootstrap/Col';
import Form from "./../common/form";
import { getcloudProvider, getMachineTypebycloudId,getcloudAccountByProviderId, getcloudRegionbyId, getInfraTypeById, getallOS, getSoftwareById, getImageById } from './../../services/dataServices';
import { Row,FormFile, Button } from "react-bootstrap";
import MachineContext from './../../context/MachinePage';
import ComponentForm from "./componentForm";

let   selectedSoftware=[]

class MachineForm extends Form {
        state = {
            data: {
            machineName: "",
            imageId: "",
            cloudProviderId:"",
            machineTypeId :"",
            cloudAccountId:"",
            cloudRegionId:"0",
            infraTypeId:"0",
            osId:"0",
            playbook:null,
            },
            selectedSoftwares:[{}],
            names:{
              cloudAccountName:"",
              cloudRegionName:"",
              infraTypeName:"",
              machineTypeName:"",
              cloudProviderName:"",
              imageName:"",
              osName:"",
            },
            currentStep:null,
            genres: [],
            machines:[],
            cloudProvider:[],
            cloudAccount:[],
            cloudRegion:[],
            infraType:[],
            software:[],
            os:[],
            image:[],
            errors: {}
        };
        
  schema = {
    _id: Joi.string(),
    machineName: Joi.string().required().label("Machine Name"),
    imageId: Joi.string().required().label("Image"),
    cloudProviderId:Joi.string().required().label("Cloud provider"),
    cloudAccountId: Joi.string().required().label("Cloud Account"),
    cloudRegionId: Joi.number().min(1).required().label("Cloud Region"),
    machineTypeId:Joi.string().required().label("Machine name"),
    infraTypeId: Joi.number().min(1).required().label("Infra type"),
    osId: Joi.number().min(1).required().label("Os type"),

  };

    validateSoftwareschema={
        infra:this.schema.infraTypeId,
        os:this.schema.osId
      };

  async populateMachineSelects() {
    //   populate cloud provider Id in machine type
    const { data: machine } = await getMachineTypebycloudId();
    this.setState({ machines: machine.data.machineType});

 //    populate cloud Provider name
    const { data: cloud } = await getcloudProvider();
    this.setState({ cloudProvider: cloud.data.listOfCloudProviders});


    const {data: account} = await getcloudAccountByProviderId("1");
    this.state.cloudAccount = account.data.getCloudAccountByCloudId

    // populate cloud region
    const {data: region}= await getcloudRegionbyId("1")
    this.setState({cloudRegion : region.data.getCloudAccountRegionByCloudId.map(post=>post.cloudRegion)})

    //populate infra type
    const {data:infra} = await getInfraTypeById("0");
    this.setState({infraType : infra.data.getInfraTypeByCloudId})

    //populate OS
    const {data:os}= await getallOS();
    this.setState({os: os.data.getAllOS})

    //populate softwatre
    const {data:software} = await getSoftwareById("0","0");
    this.setState({software: software.data.getSoftwareByInfraTypeAndOsId})

    const {data:image} = await getImageById("0","0","0")
    this.setState({image: image.data.getImagesByIds})
  }

  async componentDidUpdate(prevProps,prevState){
    if(this.state.data.cloudProviderId !== prevState.data.cloudProviderId)
        this.populateCloudProvider();
    if(this.state.data.cloudAccountId !== prevState.data.cloudAccountId )
        this.populateCloudRegion();
    if(this.state.data.infraTypeId !== prevState.data.infraTypeId || this.state.data.osId !== prevState.data.osId)
      // if(this.state.data.infraTypeId === 0 || this.state.data.osId === 0){return;}
       this.populateSoftware();
    if(this.state.data.infraTypeId !== prevState.data.infraTypeId || this.state.data.osId !== prevState.data.osId || this.state.data.cloudRegionId !== prevState.data.cloudRegionId)
      this.populateImage();
  }

  async populateCloudProvider(){
      //populate cloud account and infratype as both depend on cloud provider id
    const {data: account} = await getcloudAccountByProviderId(this.state.data.cloudProviderId);
    this.state.cloudAccount = account.data.getCloudAccountByCloudId;

    const { data: infra }= await getInfraTypeById(this.state.data.cloudProviderId);
    this.state.infraType = infra.data.getInfraTypeByCloudId;
  }

  async populateCloudRegion(){
    const {data: region} = await getcloudRegionbyId(this.state.data.cloudAccountId);
    this.state.cloudRegion = region.data.getCloudAccountRegionByCloudId.map(post=>post.cloudRegion);
  }

  async populateSoftware(){
      const {data: software} = await getSoftwareById(this.state.data.infraTypeId,this.state.data.osId)
      this.state.software = software.data.getSoftwareByInfraTypeAndOsId;
      console.log(this.state.errors)
  }
  async populateImage(){
      const {data: image}= await getImageById(this.state.data.infraTypeId,this.state.data.cloudRegionId,this.state.data.osId)
      this.state.image= image.data.getImagesByIds;
  }
  
  onFileChange =(e)=>{
    this.state.data.playbook = e.target.files[0];
  }

  async componentDidMount() {
    await this.populateMachineSelects();
  }

  doChange(input){
    if(input.selectedIndex){
      let selectedText = input.selectedIndex;
      let names = this.state.names;
      names[input.id] = input[selectedText].text;
    this.setState({names})}
    
  }
  onselect=(selectedItem)=>{
    this.setState({selectedSoftwares:selectedItem.map(item=>({softwareName:item.softwareName , softwareid:item.softwareId}))})
  }

  onRemove = (removedItem) => {
    selectedSoftware = selectedSoftware.filter((item) => item.softwareId !== ""+removedItem.softwareId);
    this.setState({
      selectedSoftwares: selectedSoftware
    });
}

componentForm(){
  if (this.props.currentStep >= 3){
    return(
      <ComponentForm currentStep={this.props.currentStep} />
    )
  }
}

  machineform(){
    // if(this.props.currentStep===2){
    return(
        <form onSubmit={this.handleSubmit}>
            {this.renderInput("machineName", "Machine Name")}
            <Row>
              
              <Col >{this.renderSelect("cloudProviderId", "Cloud Provider Id", this.state.cloudProvider,"cloudProviderId")}</Col>
              <Col >{this.renderSelect("cloudProviderId", "Machine Type", this.state.machines,"cloudProviderId")}</Col>
              <Col >{this.renderSelect("cloudAccountId", "Cloud Account", this.state.cloudAccount,"cloudAccountName",this.state.data.cloudProviderId,this.schema.cloudProviderId)}</Col>
              </Row>
              <Row>
              <Col >{this.renderSelect("infraTypeId", "InfraType", this.state.infraType,"infraTypeName",this.state.data.cloudProviderId,this.schema.cloudProviderId)}</Col>
              <Col >{this.renderSelect("cloudRegionId", "Cloud Region", this.state.cloudRegion,"cloudRegionName",this.state.data.cloudAccountId,this.schema.cloudAccountId)}</Col>
              <Col >{this.renderSelect("osId", "OS Type", this.state.os,"osName")}</Col>
              </Row>
              <Row>
              <Col>{this.renderMultiSelect("softwareName", "softwares",this.state.software,this.onselect,this.onRemove,{infra:this.state.data.infraTypeId,os:this.state.data.osId},this.validateSoftwareschema)}</Col>
              <Col >{this.renderSelect("imageId", "Image", this.state.image,"imageName",{infra:this.state.data.infraTypeId,os:this.state.data.osId,cloud:this.state.data.cloudRegionId},{ infra:this.schema.infraTypeId,os:this.schema.osId,cloud:this.schema.cloudRegionId})}</Col>
              <Col >{this.state.names.infraTypeName ==="VM"?<FormFile className="p-3 " label ="Playbook" name="playbook"  onChange={this.onFileChange}/>:""}</Col>
            </Row>
        </form>
    )}
// }

renderMachine(){
  if(this.props.currentStep===2 || this.props.currentStep===4){
    return(this.machineform())
  }
}

  render() {
    return (
      <MachineContext.Provider value={this.state}>
        <div>
          {this.renderMachine()}
          {this.componentForm()}
        </div>
      </MachineContext.Provider>
    );
}
}
export default MachineForm;
