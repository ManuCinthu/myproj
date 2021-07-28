import ApplicationForm from "./applicationForm";
import React from "react";
import Table from "../common/table";
import { Link } from 'react-router-dom';

const ApplicationTable = (props) => {

   const columns = [
    { path: "applicationName", label: "Application Name", size: "3", textAlign: "text-left", display: "block" },	
    { path: "applicationDescription", label: "Description", size: "3", textAlign: "text-left", display: "block" },	
    { path: "user.userName", label: "Created By", size: "2", textAlign: "text-left" },
    {label: "Version",
      key: "view",
      size: "2",	
      textAlign: "text-center",
      content: post => <Link to = {`/version/${post.applicationId}`}><button type="button" className="btn btn-link btn-sm" data-toggle="tooltip" data-placement="bottom" title="View Versions"><i className="fa fa-eye"> </i></button></Link>,
    },
    {
      key: "update",
      size: "1",	
      textAlign: "text-center",
      content: (post) => (<Link to={`/applicationForm/${post.applicationId}`} className="btn btn-info"><i className="fa fa-edit"> </i></Link>

        // <ApplicationForm
        //   label=""
        //   variant="info"
        //   size="sm"
        //   updateTable={props.onUpdate}
        //   title="Edit Application"
        //   applicationId={post.applicationId}        
        // />
      ),
    },
    {
      key: "delete",
      size: "1",	
      textAlign: "text-center",
      display: "block",
      content: post => (
        <button
          onClick={() => props.onDelete(post)}
          className="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="bottom" title="Delete">
          <i className="fa fa-times"></i>
        </button>
      ),
    },
  ];
  return <Table columns={columns} data={props.data} />;
};
export default ApplicationTable;
