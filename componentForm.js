import React from "react";
import Form from "./../common/form";
import "bootstrap/dist/css/bootstrap.css";
import MachineContext from './../../context/MachinePage';
import  Joi from 'joi-browser';
import { Row } from "react-bootstrap";
import ComponentContext from './../../context/componentPage';
import CreateTemplate from "./saveTemplate";
import PreviewTemplate from "./PreviewTemplate";

class ComponentForm extends Form {
    constructor() {
        super();
        this.state = {
          data:{
          components: [{name:""}],
        }
      };
      }
    
    schema={
        // components: Joi.any().required().label("Template Name"),
        name: Joi.string().required()
    }
        
        handleComponentChange = (id) => (e) => {
          console.log(this.state.data.components.map(names=>names.name))
          const newComponents = this.state.data.components.map((component, cid) => {
            if (id !== cid) return component;
            return { ...component, name: e.target.value };
          });
          let data={...this.state.data.components}
          data["components"] = newComponents
          this.setState({ data});
          console.log(this.state.data.components)

        }
        
        handleSubmit = (e) => {
          // const { name, components } = this.state.data;
          // alert(`Incorporated: ${name} with ${components.length} components`);
        }

        createTemplate(){
          if(this.props.currentStep=== 4)
          {return(
            <div>
            {/* <PreviewTemplate/> */}
          <CreateTemplate/>
          </div>)}
        }
        
        handleAddComponent = () => {
          let data={...this.state.data.components}
          data["components"] = this.state.data.components.concat([{ name: '' }])
          this.setState({ data });
          console.log(this.state.data.components)
        }
        
        handleRemoveComponent = (id) => () => {
          let data={...this.state.data.components}
          data["components"]= this.state.data.components.filter((c, cid) => id !== cid)
          this.setState({data})
        }

        doChange(){}

         componentForm=()=>{
          if(this.props.currentStep===3 || this.props.currentStep===4 ){
          return(
          <form onSubmit={this.handleSubmit}>
            <Row className="justify-content-between">
              <h4>Components</h4>
              <button type="button" onClick={this.handleAddComponent} className="small btn btn-primary">Add Component</button>
              </Row>
              {this.state.data.components.map((component, id) => (
                <div className="form-inline" >
                  <input
                  className="m-4 form-control"
                    type="text"
                    placeholder={`${id + 1} Component name`}
                    value={component.name}
                    onChange={this.handleComponentChange(id)}
                  />
                  <input
                  className="m-4 form-control"
                    disabled
                    type="text"
                    placeholder="Machine name"
                    value={this.context.data.machineName}
                  />
                  <button type="button" onClick={this.handleRemoveComponent(id)} className="small btn btn-danger">X</button>
                </div>
              ))}</form>)}
        }

        render() {    
          return (
            <ComponentContext.Provider value={this.state.data.components}>
            {this.componentForm()}
              {this.createTemplate()}
            </ComponentContext.Provider>
          )
        }
      }
      

ComponentForm.contextType= MachineContext;

export default ComponentForm;