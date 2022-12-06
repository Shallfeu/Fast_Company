import React from "react";

type TableHeaderProps = {
  selectedSort: { path: string; order: "asc" | "desc" };
  columns: any;
  onSort: (item: { path: string; order: "asc" | "desc" }) => void;
};

const TableHeader: React.FC<TableHeaderProps> = ({
  selectedSort,
  columns,
  onSort,
}) => {
  const handleSort = (item: string) => {
    if (selectedSort?.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort?.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };

  const renderArrowSort: any = (item: string) => {
    if (selectedSort?.path === item && selectedSort?.order === "asc") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-up-fill"
          viewBox="0 0 16 16"
        >
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg>
      );
    }
    if (selectedSort?.path === item && selectedSort?.order === "desc") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column: string) => {
          return (
            <th
              key={column}
              onClick={
                columns[column].path
                  ? () => handleSort(columns[column].path)
                  : undefined
              }
              scope="col"
              role={columns[column].path ? "button" : ""}
            >
              {columns[column].name}
              {renderArrowSort(columns[column].path)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
