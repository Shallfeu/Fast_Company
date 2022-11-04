import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { ColumnProp } from "./Table";
import { IUser } from "../../../store/usersSlice/slice";

type TableBodyProps = {
  data: IUser[];
  columns: any;
};

const renderContent = (item: IUser, column: ColumnProp) => {
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
          {Object.keys(columns).map((column: string) => (
            <td key={column}>{renderContent(item, columns[column])}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
