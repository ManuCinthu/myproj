import React  from "react";
import 'react-toastify/dist/ReactToastify.css';
import Table from "../common/table";
import { Link } from "react-router-dom";



const SoftwareTable = (props) => {
 
const columns =[
      //{ path: "softwareId", label: "softwareId Id", size: "2", textAlign: "text-left" },
        { path: "softwareName", label: "Software Name", size: "3", textAlign: "text-left" },
        { path: "createdDate", label: "Created Date", size: "3", textAlign: "text-left" },
       
{ key: "Update", 
size: "1", 
textAlign: "text-center",
content: (post) =>
(<Link to={`/SoftwareForm/${post.softwareId}`}
className="btn btn-info"><i className="fa fa-edit"> </i></Link>
)},
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

export default SoftwareTable;
