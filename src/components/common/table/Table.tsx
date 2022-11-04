import React from "react";
import { IUser } from "../../../store/usersSlice/slice";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export type TableProps = {
  data: IUser[];
  selectedSort: { path: string; order: "asc" | "desc" };
  columns: ColomnsProps;
  onSort: (item: { path: string; order: "asc" | "desc" }) => void;
  children?: JSX.Element;
};

export type ColumnProp = {
  path: string;
  name: string;
  component?: (user: IUser) => JSX.Element;
};

export type ColomnsProps = {
  name: ColumnProp;
  qualities: ColumnProp;
  profession: ColumnProp;
  completedMeetings: ColumnProp;
  rate: ColumnProp;
  bookmark: ColumnProp;
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
          <TableBody data={data} columns={columns} />
        </>
      )}
    </table>
  );
};

export default Table;
