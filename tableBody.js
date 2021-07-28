import React from "react";
import _ from "lodash";

const TableBody = (props) => {
  const renderCell = (item, column) => {
    return column.content ? column.content(item) : _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key||item && item.length >0 );
  };

  const renderMsg=(item,column)=>{
    {if (column.content(item==[]))
    return<div className="alert alert-secondary text-center m-3 pt-3 pb-3" role="alert">
    There are no Applications to display !

    </div>
    }
  };
  // const listItems=(items,column) =>{item && item.length >0 
  //                       ?  item.map(this.createContact) 
  //              : <tr key={item.key}>
  //                 <td rowspan="3">No data</td
  //               </tr></tr>

  return (
    <tbody>
      {props.data.map((item) => (
        <tr className="d-flex" key={item._id}>
          {props.columns.map((column) => (
            <td data-title={props.columns} className={`col-${column.size} 
            ${column.textAlign} 
            ${column.display}
            `} 
            key={createKey(item, column)}>
            {renderCell(item, column)}
         {/* // {renderMsg(item, column)} */}
          </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
export default TableBody;
