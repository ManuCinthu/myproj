import React from "react";
import Joi from "joi-browser";
import Col from 'react-bootstrap/Col';
import Form from "./../common/form";
import { createsoftware, getallInfratype, updatesoftware, getSoftwaresByIds, getallOS } from './../../services/dataServices';
import { Row, FormFile, Button } from "react-bootstrap";
import OsContext from './../../context/osPage';
import Breadcrumbs from "./../common/breadcrumbs";
import Navbar from './../../global/navbar/navbar';
import Header from './../../global/header/header';
import LoadingSpinner from './../common/loading';
import Heading from "../common/heading";




class SoftwareForm extends Form {

  state = {

    posts: [],
    data: {
      _id: this.props.match.params.id,
      softwareName: "",
      osId: "",
      infraTypeId: ""

    },
    softwareInstallPlaybook: null,
    softwareUpdatePlaybook: null,
    deliverables: null,
    getsoftwareId: [],
    infraType: [],
    os: [],
    getosId: [],
    
    getinfratypeId: [],
    //getinfratypebyinfratypeId: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    softwareName: Joi.string().required().label("softwareName"),
    osId: Joi.string().required().label("osId"),
    infraTypeId: Joi.string().required().label("infraTypeId"),

  };
  breadcrumbs = [{ name: "Home", link: "/dashboard" }, { name: "Software", link: "/Software" }, { name: "Software Form" }]


  async populateSoftwaredetails() {

    //populate infratype
    const { data: getInfrabyId } = await getallInfratype();
    this.setState({getinfratypeId:getInfrabyId.data.getAllInfraType})
     console.log(this.state.getinfratypeId.infraTypeName)

    //populate OS
    const { data: os } = await getallOS("3");
    this.setState({ getosId: os.data.getAllOS })
  }

  async mapfunctions() {
    if (this.props.match.params.id === "new") return;
    else {
      const { data: getsoftwarebyId } = await getSoftwaresByIds(this.props.match.params.id);
      const softbyId = getsoftwarebyId.data.Software;
      console.log(softbyId);
      //this.state.data.infraTypeName=infrabyId.infraTypeName
      this.setState({ data: this.mapToViewModel(softbyId) });
      // console.log({data: this.mapToViewModel(infrabyId)}+"============")
    };
  }

  mapToViewModel(softbyId) {
    return {
      _id: softbyId.softwareId,
      softwareName: softbyId.softwareName,
      infraTypeName: softbyId.infraType.infraTypeName,
      osId: softbyId.os.osId,
      osName: softbyId.os.osName,
      //softwareInstallPlaybook:softbyId.softwareInstallPlaybook


    };
  }


  async componentDidMount() {
    await this.populateSoftwaredetails();
    await this.mapfunctions();
  }




  doSubmit = async () => {
    const { data } = this.state;
    await createsoftware(
      data.softwareName,
      this.state.softwareInstallPlaybook,
      this.state.softwareUpdatePlaybook,
      this.state.deliverables,
      data.osId,
      data.infraTypeId,

    );
    console.log(this.state.data)
  };


  // doUpdate = async () => {
  //   const { data } = this.state;
  //   await updatesoftware(
  //     data.softwareName,
  //    this.state.softwareInstallPlaybook,
  //    this.state.softwareUpdatePlaybook,
  //    this.state.deliverables,
  //    data.createdBy,
  //    data.createdDate,
  //    data.osId,
  //    data.infraTypeId,
  //     );
  //     console.log(this.state.data)
  // };

  createButton = () => {
    if (this.props.match.params.id === "new") {
      return (<form onSubmit={this.handleSubmit}>{this.renderButton("Save")}</form>)
    }
    else {
      return (<Button className="btn btn-dark form-control"
        onClick={this.doUpdate}>Update</Button>)
    }
    ;
  };
  doChange() { }

  softwareform = () => {

    return (
      <form onSubmit={this.handleSubmit} maxlength="4" size="4" class="form-group col-md-6">

        <Col> {this.renderInput("softwareName", "Software Name")}</Col>
        {/* <Col >{this.renderSelect("cloudProviderId", "CloudProviderName", this.state.cloudProvider,"cloudProviderName")}</Col> */}
        <Row>
        <Col>{this.renderSelect("osName", "OS Name", this.state.getosId, "osName")}</Col>
        <Col>{this.renderSelect("infraTypeName", "Infratype Name", this.state.getinfratypeId, "infraTypeName")}</Col> </Row>
        <Row>
          {this.renderFile("softwareInstallPlaybook", "SoftwareInstallPlaybook", "file", ".yml")}
          {this.renderFile("softwareUpdatePlaybook", "SoftwareUpdatePlaybook", "file", ".yml")}
          {this.renderFile("deliverables", "Deliverables", "file", ".yml")}
        </Row>



      </form>

    )
  }


  render() {

    return (
      <OsContext.Provider value={this.state}>
        {this.state.loading ? <LoadingSpinner /> :
          <div className="home">
            <Header />
            <div className="root"> <Navbar />
              <div className="mainContainer">
                <Breadcrumbs breadcrumbs={this.breadcrumbs} />
                <div><Heading headingName="Software Form" />

                  <div className="ml-5 mr-5 p-4">
                    {this.softwareform()}
                    <div className="float-left pr-3" style={{ width: '30rem' }}>
                      {this.createButton()}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>}
      </OsContext.Provider>
    );
  }
}





export default SoftwareForm;
