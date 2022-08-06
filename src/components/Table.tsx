import React from "react";
import { StateData } from "./Users";

import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export type TableProps = {
  data: StateData[];
  selectedSort: { path: string; order: "asc" | "desc" };
  columns: any;
  onSort: (item: { path: string; order: "asc" | "desc" }) => void;
  children?: any;
};

const Table: React.FC<TableProps> = ({
  selectedSort,
  columns,
  onSort,
  data,
  children,
}) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader
            selectedSort={selectedSort}
            columns={columns}
            onSort={onSort}
          />
          <TableBody data={data} columns={columns} />;
        </>
      )}
    </table>
  );
};

export default Table;
