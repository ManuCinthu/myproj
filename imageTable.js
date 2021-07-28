import React  from "react";
import 'react-toastify/dist/ReactToastify.css';
import Table from "../common/table";
import { Link } from "react-router-dom";

const ImageTable = (props) => {
 
const columns =[
        { path: "imageId", label: "ImageId", size: "2",textAlign: "text-left", display: "d-none"},
        { path: "imageUrl", label: "ImageUrl", size: "3", textAlign: "text-left" },
        { path: "imageName", label: "ImageName", size: "1", textAlign: "text-left" },
        //{ path: "cloudAccountRegionId", label: "cloudAccountRegionId", size: "2", textAlign: "text-left" },
        // { path: "os.osId", label: "cloudAccountRegionId", size: "2", textAlign: "text-left" },
        { path: "os.osName", label: "OS Name", size: "1", textAlign: "text-left" },
         { path: "infraType.infraTypeName", label: "InfraType Name", size: "2", textAlign: "text-left" },
        { path: "ports", label: "Ports", size: "1", textAlign: "text-left" },
        { path: "mountPoint", label: "MountPoint", size: "1", textAlign: "text-left" },
       
        { key: "Update", 
        size: "1", 
        textAlign: "text-center",
        content: (post) => (<Link to={`/ImageForm/${post.imageId}`} className="btn btn-info"><i className="fa fa-edit"> </i></Link>
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

export default ImageTable;
