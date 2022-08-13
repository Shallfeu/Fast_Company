import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { StateData } from "./layouts/Users";

type TableBodyProps = {
  data: StateData[];
  columns: any;
};

const renderContent = (item: StateData, column: any) => {
  if (column.component) {
    if (typeof column.component === "function") {
      return column.component(item);
    }
    return column.component;
  }

  return column.path === "name" ? (
    <Link to={`/users/${item._id}`}>{item.name}</Link>
  ) : (
    _.get(item, column.path)
  );
};

const TableBody: React.FC<TableBodyProps> = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column: any) => (
            <td key={column}>{renderContent(item, columns[column])}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
