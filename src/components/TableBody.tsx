import React from "react";
import _ from "lodash";

import { StateData } from "./Users";

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
  return _.get(item, column.path);
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
