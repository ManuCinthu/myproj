import React  from "react";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Table from "../common/table";
import CreateMachine from "./createmachineForm";

const MachineTable = (props) => {
 
const columns =[
        { path: "machineTypeId", label: "Machine type Id ", size: "2",textAlign: "text-left", display: "d-none"},
        { path: "machineTypeName", label: "Machine Type Name", size: "4", textAlign: "text-left" },
        { path: "ram", label: "RAM", size: "2", textAlign: "text-left" },
        { path: "storage", label: "Storage", size: "2", textAlign: "text-left" },
        { path: "cpu", label: "CPU(Number of cores) ", size: "2", textAlign: "text-left" },
        {path: "cloudProvider.cloudProviderId", label: "Cloud Id ", size: "2", textAlign: "text-left"},


        { key: "Update", 
          size: "1", 
          textAlign: "text-center",
          content: (post) => (  <Link to = {`/machineForm/${post.machineTypeId}`}><button type="button" className="btn btn-info btn-sm" ><i className="fa fa-edit"> </i></button></Link>)
          // <CreateMachine
          // label=""
          // variant="info"
          // size="sm"
          // title="Update Machine" 
          // data={post}
          // onUpdate={props.onUpdate}
          // />)
  },
          { key: "delete",
            size: "1", 
            textAlign: "text-center",
            content: () => (
              <button className="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="bottom" title="Delete">
              <i className="fa fa-times"></i>
              </button>
            ),
          },
        ];

  return <Table columns={columns} data={props.data} />;
};

export default MachineTable;
