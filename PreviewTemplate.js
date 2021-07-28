import React, { useContext } from "react";
import MachineContext from "../../context/MachinePage";
import TemplateContext from '../../context/templatePage';
import ComponentContext from "../../context/componentPage";
import TreeModal from './../common/treeView';


const PreviewTemplate =() => {
    
  const machineContext = useContext(MachineContext);
  const templateContext = useContext(TemplateContext);
  const componentContext =  useContext(ComponentContext);


  const data = {
    id: 'root',
    name: 'Template details',
    children: [
      {
        id: '1',
        name: `template Name: ${templateContext.applicationTemplateName}`,
      },
      {
        id: '2',
        name: ` description: ${templateContext.applicationTemplateDescription}`,
      },
      {
        id: '3',
        name: ` Product: ${templateContext.names.productName}`,
      },
      {
        id: '4',
        name: 'Machine Details',
        // children:componentContext.map((componentName)=>(componentName.name))
        // sample:componentContext
        children: [
          {
            id: '5',
            name: 'Components',
            children:
                componentContext.map((componentName)=>(componentName.name)).map((name)=>({ name:`${name.name}`}))         
          },
        ],
      },
    ],
  };


  return(<div className="mb-5"><TreeModal componentContext={componentContext.map((componentName)=>(componentName.name))} treeItem={data}/></div>)
}
export default PreviewTemplate;