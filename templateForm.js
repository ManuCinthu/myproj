import React from "react";
import Joi from "joi-browser";
import Form from "./../common/form";
import { listallproducts } from './../../services/dataServices';
import MachineForm from "./machineForm";
import Breadcrumbs from "./../common/breadcrumbs";
import Navbar from './../../global/navbar/navbar';
import Header from './../../global/header/header';
import Heading from "../common/heading";
import LoadingSpinner from './../common/loading';
import TemplateContext from './../../context/templatePage';
import Steppers from "../common/stepper";


class TemplateForm extends Form {
  state = {
    currentStep: 1,
    enableApp:false,
    data: {
      names:{productName:""},
      currentStep:this.state.currentStep,
      applicationTemplateName: "",
      // productId: "",
      applicationTemplateDescription: "",
      component:"",
    },
    machine:[],
    product: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    applicationTemplateName: Joi.string()
      .required()
      .label("Template Name"),
    productId: Joi.string()
      .required()
      .label("product"),
    applicationTemplateDescription: Joi.string()
      .required()
      .min(0)
      .max(100)
      .label("Description"),

  };

  breadcrumbs=[{name:"Home", link:"/dashboard"},{name:"Template", link:"/template"},{name:"Template Form"}]

  //stepper
  //  getSteps() {
   steps= ['template Details', 'Add new machine', 'Add new component','preview'];
  // }

  async populateProduct() {
    const { data: product } = await listallproducts();
    const products = product.data.findAllProducts.map(post=> post)
    this.setState({ product: products});
  }

  async componentDidMount() {
    await this.populateProduct();
    console.log(this.context)
  }
  doChange(input){
    if(input.selectedIndex){
      let selectedText = input.selectedIndex;
      let names = this.state.data.names;
      names[input.id] = input[selectedText].text;
    this.setState({names})}
  }

  //form section
  _next = () => {
    if(this.currentStep===4){
      this.setState({enableApp:true})
    }
    // this.setState({show: true})
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 3? 4: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  
  }

//   to navigate to previous section
_prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

    previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !==1){
      return (
        <button 
          className="btn btn-secondary mr-5" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    return null;
  }
  
  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep <4){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
     }

  machineForm(){
      return(
        <MachineForm
          currentStep={this.state.currentStep}
        />
      )
    }

   doSubmit(){
     console.log("submitted")
   }
   
  templateform() {
    if (this.state.currentStep === 1|| this.state.currentStep === 4){
    return (
      // <div className="ml-5 mr-5 p-4">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("applicationTemplateName", "Template Name")}
          {this.renderTextArea("applicationTemplateDescription", "Description", "6")}
          {/* {this.renderSelect("productId", "Product", this.state.product,"productName")} */}
          {/* <button type="button" onClick={this.handleAddComponent} className="small">Add Machine</button> */}
          {/* <MachineForm onMachineChange={(data)=>this.handleMachineChange(data)}/> */}
          {/* <CreateTemplate addMachine={()=>this.addMachine} onMachineChange={(data)=>this.handleMachineChange(data)}/> */}
          {/* {this.state.machine.map((noteItem, index) => {return (<MachineForm key={index} id={index} onMachineChange={(noteItem,index)=>this.handleMachineChange(noteItem,index)}/>);})} */}
          {/* {this.renderMultiSelect("component", this.state.machine.machineName)} */}
          {/* {this.renderButton("Save")} */}
        </form>
      // </div>
    );}
  }

  render(){
    return(
      <TemplateContext.Provider value={this.state.data}>
      {this.state.loading ? <LoadingSpinner /> : 
      <div className="home">
      <Header />  
        <div className="root"> <Navbar />
            <div className="mainContainer">
                <Breadcrumbs breadcrumbs={this.breadcrumbs}/>
                <div><Heading headingName="Template Form" />
                 <Steppers activeStep={this.state.currentStep-1} steps={this.steps}/>
                <div className="ml-5 mr-5 p-4">
                <fieldset disabled={this.state.enableApp} className=" m-1 p-2">
                  {this.templateform()}
                  {this.machineForm()}
                  </fieldset>
                  {this.nextButton()}
                  {this.previousButton()}
                  </div>
                </div>
              </div>
          </div>
        </div>}
      </TemplateContext.Provider>

    )
  }
}

export default TemplateForm;
