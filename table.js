import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
// import "./table.scss"

const Table = ({ columns, data }) => {
  return (
      <div className="table-responsive container">
        <table className="table table-hover ">
          <TableHeader columns={columns}  />
          <TableBody columns={columns} data={data} />
        </table>
      </div>
  );
};

export default Table;
