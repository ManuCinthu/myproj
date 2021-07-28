import React from "react";
import Joi from "joi-browser";
import Col from 'react-bootstrap/Col';
import Form from "./../common/form";
import { getcloudProvider, createImage,getImageByIdios,
  getcloudAccountByProviderId, getcloudaccountRegionbyId, 
  getInfraTypeById, getallOS,getOsbyId,
  getImageById,updateImage,getcloudRegionbyId } from './../../services/dataServices';
import { Row,FormFile, Button } from "react-bootstrap";
import ImageContext from './../../context/MachinePage';
import Breadcrumbs from "./../common/breadcrumbs";
import Navbar from './../../global/navbar/navbar';
import Header from './../../global/header/header';
import LoadingSpinner from './../common/loading';
import Heading from "../common/heading";
import { toast } from 'react-toastify';




class ImageForm extends Form {
        state = {
            data: {
            _id: this.props.match.params.id,
            imageUrl:"",
            imageName:"",
            ports:"",
            mountPoint:"",
            cloudProviderId:"",
            cloudAccountId:"",
            
            cloudRegionName:"",
            //infraTypeId:"",
            osId:parseInt(""),
            infraTypeName:""
            
            
            //cloudAccountRegionId:parseInt(""),
           
            // infraTypeName:"",
            // cloudRegionName:"",
            // cloudAccountId:"",
            // cloudProviderId:"",
            
            

            },
            names:{
            cloudProviderName:"",
            cloudAccountName:"",
           // infraTypeName:"",
            //cloudRegionName:"",
            osName:"",
            cloudRegionId:"",
            //cloudAccountId:parseInt(""),
            //cloudProviderId:parseInt(""),
            
            },
            cloudProvider:[],
            cloudAccount:[],
            cloudRegion:[],
            infraType:[],
            getosId:[],
            os:[],
            image:[],
            errors: {}
        };
        
  schema = {
    _id: Joi.string(),
    imageUrl: Joi.string().required().label("ImageUrl"),
    imageName:Joi.string().required().label("ImageName"),
    //cloudAccountRegionId:Joi.string().required().label("cloudAccountRegionId"),
    osId:Joi.string().required().label("osId"),
    //osName:Joi.string().required().label("osName"),
    //infraTypeId: Joi.number().min(1).required().label("Infra type Id"),
    //infraTypeId: Joi.string().required().label("Infra type Id"),
    infraTypeName: Joi.string().required().label("Infra type Name"),
    ports:Joi.string().required().label("Ports"),
    mountPoint:Joi.string().required().label("Mount Point"),
    cloudAccountId: Joi.string().required().label("Cloud Account"),
    //cloudProviderName:Joi.string().required().label("cloudProviderName"),
    //cloudProvider:Joi.string().required().label("cloudProvider"),
    cloudProviderId:Joi.string().required().label("Cloud provider"),
    cloudRegionName:Joi.string().required().label("Cloud Region Name"),
    //cloudAccountName:Joi.string().required().label("cloudAccountName")
  };
  breadcrumbs=[{name:"Home", link:"/dashboard"},{name:"Images", link:"/image"},{name:"Image Form"}]

    

  async populateImageDetails() {
    //populate cloud Provider name
    const { data: cloud } = await getcloudProvider();
    this.setState({ cloudProvider: cloud.data.listOfCloudProviders}
      );
      

    //populate cloud ProviderId 
    const {data: account} = await getcloudAccountByProviderId("1");
    this.state.cloudAccount = account.data.getCloudAccountByCloudId
    

    // populate cloud accountregionId
    const {data: region}= await getcloudaccountRegionbyId("1")
    this.setState({cloudRegion : region.data.getCloudAccountRegionByCloudId.map(post=>post.cloudAccountRegionId)}
    
    );
    

    //populate infra type
    const {data:infra} = await getInfraTypeById("1");
    this.setState({infraType : infra.data.getInfraTypeByCloudId.map(post=>post.infraTypeName)})
    console.log(this.state.infraType)

    //populate OS
    const {data:os}= await getallOS("3");
    this.setState({getosId: os.data.getAllOS})
    
    
  }

  async componentDidUpdate(prevProps,prevState){
    if(this.state.data.cloudProviderId !== prevState.data.cloudProviderId)
        this.populateCloudProvider();
    if(this.state.data.cloudAccountId !== prevState.data.cloudAccountId )
        this.populateCloudRegion();
   }

  async populateCloudProvider(){
    //populate cloud account and infratype as both depend on cloud provider id
  const {data: account} = await getcloudAccountByProviderId(this.state.data.cloudProviderId);
  
  this.setState({cloudAccount:account.data.getCloudAccountByCloudId});
  

  const { data: infra }= await getInfraTypeById(this.state.data.cloudProviderId);
  this.setState({infraType :infra.data.getInfraTypeByCloudId});
  
}

async populateCloudRegion(){
  const {data: region} = await getcloudRegionbyId(this.state.data.cloudAccountId);
  this.setState({cloudRegion :region.data.getCloudAccountRegionByCloudId.map(post=>post.cloudRegion)});
}


  async mapfunctions(){
    if (this.props.match.params.id === "new") return;
    else{
      const { data: getImagebyId } = await getImageByIdios(this.props.match.params.id);
     const imagebyId = getImagebyId.data.getImagesById;
     console.log(imagebyId);
     this.setState({data: this.mapToViewModel(imagebyId)});
    
    }
 
  }
  
  mapToViewModel(image){
    return {
      _id:image.imageId,
      imageUrl:image.imageUrl,
      imageName:image.imageName,
      osId:image.os.osId,
      osName:image.os.osName,
      mountPoint:image.mountPoint,
      ports:image.ports,
      infraTypeId:image.infraType.infraTypeId,
      infraTypeName:image.infraType.infraTypeName,
      cloudAccountName:image.cloudaccountregion.cloudAccount.cloudAccountName,
      cloudProviderName:image.cloudaccountregion.cloudAccount.cloudProvider.cloudProviderName,
      cloudProviderId:image.cloudaccountregion.cloudAccount.cloudProvider.cloudProviderId,
      cloudAccountId:image.cloudaccountregion.cloudAccount.cloudAccountId,
      cloudRegionName:image.cloudaccountregion.cloudRegion.cloudRegionName
      };
  }

  async componentDidMount() {
    await this.populateImageDetails();
    await this.mapfunctions();
   
  }
 
doSubmit = async () => {
  const { data } = this.state;
  await createImage(
  
    data.imageUrl,
    data.imageName,
    data.ports,
    data.mountPoint,
    data.cloudProviderId,
    data.cloudAccountId,
    data.osId,
    data.cloudRegionName,
    data.infraTypeName,
    
    
    //data.cloudAccountRegionId
    
    
  );
  this.props.history.replace("/image")
  toast.success(`${data.imageName} Created!`)

};


doUpdate = async () => {
  const { data } = this.state;
  await updateImage(

    data._id,
    data.imageUrl,
    data.imageName,
    data.ports,
    data.mountPoint,
    data.cloudProviderId,
    data.cloudAccountId,
    data.osId,
    data.cloudRegionName,
    data.infraTypeName
    //data.osName,
    //data.cloudAccountRegionId
  );
  this.props.history.replace("/image")
  toast.success(`${data.imageName} Updated!`)
 
};

createButton = () => {
  if(this.props.match.params.id === "new"){
  return( <form onSubmit={this.handleSubmit}>{this.renderButton("Save")}</form>)}
  else{return (<Button className="btn btn-primary float-right" 
  onClick={this.doUpdate}>Update</Button>)}
  ;
};
doChange(){}

  imageform(){
    
    return(
        <form onSubmit={this.handleSubmit}>
             <Col>{this.renderInput("imageUrl", "ImageUrl")}</Col>
             <Col>{this.renderInput ("imageName","Image name")}</Col>
             <Col>{this.renderInput ("ports","Ports")}</Col>
             <Col>{this.renderInput ("mountPoint","Mount Points")}</Col>
              <Row>
              <Col >{this.renderSelect("cloudProviderId", "CloudProviderName", this.state.cloudProvider,"cloudProviderName")}</Col>
              <Col >{this.renderSelect("cloudAccountId", "CloudAccountName", this.state.cloudAccount,"cloudAccountName",this.state.data.cloudProviderId,this.schema.cloudProviderId)}</Col>
              <Col >{this.renderSelect("cloudRegionName", "CloudRegionName", this.state.cloudRegion,"cloudRegionName",this.state.data.cloudAccountId,this.schema.cloudAccountId)}</Col>
              <Col >{this.renderSelect("infraTypeName", "InfraType Name", this.state.infraType,"infraTypeName",this.state.data.cloudProviderId,this.schema.cloudProviderId)}</Col>
              <Col >{this.renderSelect("osId", "OS Name", this.state.getosId,"osName")}</Col>
              
              </Row>
              <Row>
              
            </Row>
        </form>
    )}

  render() {
    return (
      <ImageContext.Provider value={this.state}>
      {this.state.loading ? <LoadingSpinner /> : 
      <div className="home">
      <Header />  
        <div className="root"> <Navbar />
            <div className="mainContainer">
                <Breadcrumbs breadcrumbs={this.breadcrumbs}/>
                <div><Heading headingName="Image Form" />
                  
                <div className="ml-5 mr-5 p-4">
                {this.imageform()}
                <div className="float-left pr-3"  style={{ width: '30rem' }}></div>
                {this.createButton()}
                  </div>
                </div>
              </div>
          </div>
        </div>}
      </ImageContext.Provider>
    );
  }
}



export default ImageForm;
