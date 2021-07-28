import React, { useContext } from "react";
import MachineContext from "../../context/MachinePage";
import TemplateContext from '../../context/templatePage';
import ComponentContext from "../../context/componentPage";
import { createTemplate } from '../../services/dataServices';
import { createtemplate } from "../../services/query";
import ComponentForm from "./componentForm";
import MachineForm from "./machineForm";


const CreateTemplate =() => {
  const machineContext = useContext(MachineContext);
  const templateContext = useContext(TemplateContext);
  const componentContext =  useContext(ComponentContext);

const validate=()=>{
  if (templateContext.errors===null) return false;

  else return true;
} 

const formData = new FormData()

async function doSubmit(){
const machine={
  // "machine":{
    "machineName": machineContext.data.machineName,
              "machineType":{
				"machineTypeId": parseInt(machineContext.data.machineTypeId),
				"machineTypeName":machineContext.names.machineTypeName
			  },
              "infraType":{
				"infraTypeId": parseInt(machineContext.data.infraTypeId),
				"infraTypeName":machineContext.names.infraTypeName
			  },
              "cloudAccountRegionId": parseInt(machineContext.data.cloudRegionId),
              "osId": parseInt(machineContext.data.osId),
			  "imageId":parseInt(machineContext.data.imageId)
            }
		
  // }
  const csm=
     machineContext.selectedSoftwares.map(software => ({"software": {"softwareId":software.softwareid,"softwareName":software.softwareName},machine})
     ) 


    const variables={
      "inputDataa": {
        "applicationTemplateName": templateContext.applicationTemplateName,
        "applicationTemplateDescription": templateContext.applicationTemplateDescription,
        "noOfComponents": componentContext.length,
        "noOfMachines": 1,
        "productId": parseInt(templateContext.productId),
        "components": 
             componentContext.map((componentName)=>({"componentName": componentName.name ,"csm":csm}))
          }}

          if(machineContext.names.infraTypeName==="VM"){
            //send ansibleplaybook and operation
            formData.append("operations", JSON.stringify({query: createtemplate,variables: variables}))
            formData.append("ansiblePlayBook",machineContext.data.playbook)
            await createTemplate(formData)
          }
          else{
            //send operation only
            formData.append("operations", JSON.stringify({query: createtemplate,variables: variables}))
            await createTemplate(formData)
          }
         
}


  return (
       <div> 
       {/* {componentContext.map((componentName)=>(<li>componentName: {componentName.name}</li>))} */}
        {/* {componentContext.map((componentName)=>(<p>componentName: {componentName.name}</p>))} */}
        {/* <MachineForm status="preview"/> */}
    <button  className="btn btn-primary float-right" onClick={doSubmit}>Save</button>
    </div>
  );
}

export default CreateTemplate;
