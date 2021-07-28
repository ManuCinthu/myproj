import React from "react";

const TableHeader = (props) => {
  return (
    <thead className="thead-light">
      <tr className="d-flex">
        {props.columns.map((column) => (
          <th className={`col-${column.size} ${column.textAlign} ${column.display} clickable`} key={column.path || column.key}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};
export default TableHeader;
