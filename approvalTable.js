import React , { useState } from "react";
import Table from "../common/table";
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast("Your ticket is successfully Approved!");
const notifyreject=() =>toast("Your ticket is Rejected!")
  
const ApprovalTable = (props) => {

  const initialState = {
    status: "",
    approvalId: 0
   };
    let [
  { status },
  setState
] = useState(initialState);

function response(post) {
  const body =  { 
    query: `
    mutation updateApprovalDetailsById($input: UpdateApprovalInput!) {
      updateApprovalDetailsById(input: $input) {
        message
      }
    }`,
    variables:{
      "input": {
        "approvalId": post.approvalId,
        "status": "Approved"
      }
    }
    }
  console.log(post.approvalId)
  axios.post("http://44.231.183.125:9090/deplomatic/graphql",body)

  .then(function (response) {
    console.log(response);
    
  })
  .catch(function (error) {
    console.log(error.response);
  });
  }
  function reject(post) {
    const body =  { 
      query: `
      mutation updateApprovalDetailsById($input: UpdateApprovalInput!) {
        updateApprovalDetailsById(input: $input) {
          message
        }
      }`,
      variables:{
        "input": {
          "approvalId": post.approvalId,
          "status": "Rejected"
        }
      }
      }
    console.log(post.approvalId)
    axios.post("http://44.231.183.125:9090/deplomatic/graphql",body)
  
    .then(function (reject) {
      console.log(reject);
      
    })
    .catch(function (error) {
      console.log(error.reject);
    });
    }
 
  
 
const columns =[
  // { path:"applicationVersions.application.applicationName", label:"Application Name" , size: "2", textAlign: "text-left"},
  // { path:"applicationVersions.versionName", label:"Version" , size: "1", textAlign: "text-left"},
  { path:"applicationVersions.versionName", label:"Version" , size: "1", textAlign: "text-left"},
        { path: "environmentName", label: "Environment Name ", size: "3", textAlign: "text-left" },
        { path: "requestedDate", label: "Requested Date ", size: "2", textAlign: "text-left" },
        { path:"requester.userName", label:"Requested By" , size: "1", textAlign: "text-left"},
        { path: "requestType", label: "Request Type", size: "1", textAlign: "text-left" },

        {
          
          key: "Approve", 
          size: "2", 
          textAlign: "text-center",
         content: (post) => (
          <button
        
          onClick={()=>{response(post);notify();}}
          className="btn btn-info btn-sm" data-toggle="tooltip" data-placement="bottom" title="Approve"
        ><i className="fa fa-check"> </i></button>
            ),
          },
          
          {
            key: "Reject",
            size: "2", 
            textAlign: "text-center",
            content: (post) => (
              <button
              onClick={()=>{reject(post);notifyreject();}}
          className="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="bottom" title="Reject"
        >
          <i className="fa fa-ban"> </i>
        </button>
            ),
          },
        ];

  return <Table columns={columns} data={props.data} />;
};
export default ApprovalTable;
