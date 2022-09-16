import React from "react";

type TextAreaProps = {
  label: string;
  name: string;
  value: string;
  rows: number;
  error: string | null;
  onChange: (e: any) => void;
};

const TextAreaField: React.FC<TextAreaProps> = ({
  label,
  name,
  rows,
  value,
  error,
  onChange,
}) => {
  const handleChange = ({ target }: any) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => `form-control ${error ? "is-invalid" : ""}`;

  return (
    <div className="mb-4">
      <label htmlFor={label}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          className={getInputClasses()}
          id="exampleFormControlTextarea1"
          rows={rows}
          name={name}
          value={value}
          onChange={handleChange}
        ></textarea>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default TextAreaField;
