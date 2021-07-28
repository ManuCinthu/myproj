import React, { Component } from "react";
import Steppers from "./stepper";
//Diving Form to various set
//section array to be passed as--- section=[{id:1,item:()=>this.component_01()},{id:2,item:()=>this.component_02()"}]
//where component are a jsx--- component=()=>{return(<h1>sample</h1>)}
class SectionForm extends Component{
state ={
    currentStep:1
}

//   to navigate to next section
_next = () => {
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
          className="btn btn-secondary mr-5 m-4" 
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
          className="btn btn-primary float-right m-4" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
     }

     renderForm=()=>{
         return(this.props.section.filter(p=> p.id===this.state.currentStep).map(p=>p.item()))
     }

     render(){
         return(
             <div>
                <Steppers activeStep={this.state.currentStep-1} steps={this.props.steps}/>
                <div className="ml-5 mr-5 p-4">
                    {this.renderForm()}
                    {this.previousButton()}
                    {this.nextButton()}
                 </div>
             </div>
         )
     }
    }
    export default  SectionForm;