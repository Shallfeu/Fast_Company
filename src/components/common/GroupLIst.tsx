import { isArray } from "lodash";
import React from "react";
import { ProfObjectProps, ProfProps } from "../page/usersListPage";

type GroupListProps = {
  items: ProfObjectProps | ProfProps[];
  selectedItem: ProfProps | null;
  valueProperty?: string;
  contentProperty?: string;
  onSelect: (item: ProfProps) => void;
};

const GroupList: React.FC<GroupListProps> = ({
  items,
  selectedItem,
  valueProperty = "_id",
  contentProperty = "name",
  onSelect,
}) => {
  const checkedItems = isArray(items) ? items : Object.values(items);

  return (
    <ul className="list-group">
      {checkedItems.map((prof: any): JSX.Element => {
        return (
          <button
            key={prof[valueProperty]}
            className={`list-group-item ${
              selectedItem === prof ? "active" : ""
            }`}
            onClick={() => onSelect(prof)}
            type="button"
          >
            {prof[contentProperty]}
          </button>
        );
      })}
    </ul>
  );
};

export default GroupList;
