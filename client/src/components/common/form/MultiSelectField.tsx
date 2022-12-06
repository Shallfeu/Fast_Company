import React from "react";
import Select from "react-select";

type MultiSelectFieldProps = {
  label: string;
  name: string;
  options: any;
  onChange: (e: any) => void;
  error: string | null;
  defaultValue: any;
};

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  label,
  options,
  name,
  onChange,
  error,
  defaultValue,
}) => {
  const getMultiSelectClasses = () =>
    `basic-multi-select ${error ? "is-invalid" : ""}`;

  const handleChange = (value: any) => {
    onChange({ name: name, value: value });
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  return (
    <div className="mb-4">
      <label htmlFor="flexRadioDefault1" className="form-label">
        {label}
      </label>
      <Select
        isMulti
        defaultValue={defaultValue}
        closeMenuOnSelect={false}
        options={optionsArray}
        className={getMultiSelectClasses()}
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default MultiSelectField;
