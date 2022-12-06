import React from "react";

type RadioFieldProps = {
  label: string;
  value: string;
  name: string;
  options: { name: string; value: string }[];
  onChange: (e: any) => void;
  error: string | null;
};

const RadioField: React.FC<RadioFieldProps> = ({
  label,
  value,
  name,
  options,
  error,
  onChange,
}) => {
  const handleChange = ({ target }: any) => {
    onChange({ name: target.name, value: target.value });
  };

  const getRadioClasses = () =>
    `form-check form-check-inline ${error ? "is-invalid" : ""}`;

  return (
    <div className="mb-4">
      <label htmlFor="flexRadioDefault1" className="form-label">
        {label}
      </label>
      <div>
        {options.map((option) => (
          <div
            key={`${option.name}_${option.value}`}
            className={getRadioClasses()}
          >
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={`${option.name}_${option.value}`}
              value={option.value}
              checked={option.value === value}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor={`${option.name}_${option.value}`}
            >
              {option.name}
            </label>
          </div>
        ))}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default RadioField;
