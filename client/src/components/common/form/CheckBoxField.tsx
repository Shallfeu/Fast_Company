import React, { ReactNode } from "react";

type CheckBoxFieldProps = {
  name: string;
  value: boolean;
  onChange: (e: any) => void;
  children?: ReactNode | JSX.Element;
  error?: string | null;
};

const CheckBoxField: React.FC<CheckBoxFieldProps> = ({
  name,
  value,
  onChange,
  children,
  error,
}) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  const getCheckBoxClasses = () =>
    `form-check-label ${error ? "is-invalid" : ""}`;

  return (
    <div className="form-check mb-4">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={name}
        onChange={handleChange}
        checked={value}
      />
      <label className={getCheckBoxClasses()} htmlFor="flexCheckDefault">
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default CheckBoxField;
