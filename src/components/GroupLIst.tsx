import { isArray } from "lodash";
import React from "react";
import { selectedProfProps } from "./layouts/Users";

type GroupLIstProps = {
  items: {} | [];
  selectedItem: selectedProfProps | null;
  valueProperty?: string;
  contentProperty?: string;
  onSelect: (item: selectedProfProps) => void;
};

const GroupList: React.FC<GroupLIstProps> = ({
  items,
  selectedItem,
  valueProperty = "_id",
  contentProperty = "name",
  onSelect,
}) => {
  const checkedItems = !isArray(items) ? Object.values(items) : items;

  return (
    <ul className="list-group">
      {checkedItems.map((prof: any): any => {
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
