import React from "react";

type FilterLIstProps = {
  items: {};
  valueProperty?: string;
  contentProperty?: string;
  onSelect: (filterId: string) => void;
};

const FilterList: React.FC<FilterLIstProps> = ({
  items,
  valueProperty = "_id",
  contentProperty = "name",
  onSelect,
}) => {
  return (
    <ul className="list-group">
      {Object.values(items).map((prof: any): any => {
        return (
          <button
            type="button"
            key={prof[valueProperty]}
            className="btn btn-list-group-item"
            onClick={() => onSelect(prof[valueProperty])}
          >
            {prof[contentProperty]}
          </button>
        );
      })}
    </ul>
  );
};

export default FilterList;
