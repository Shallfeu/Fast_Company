import React, { useState } from "react";

type TextFieldProps = {
  type?: string;
  label: string;
  name: string;
  value: string;
  error: string | null;
  onChange: (e: any) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  type = "text",
  label,
  name,
  value,
  error,
  onChange,
}) => {
  const handleChange = ({ target }: any) => {
    onChange({ name: target.name, value: target.value });
  };

  const [showPassword, setShowPassword] = useState(false);

  const getInputClasses = () => `form-control ${error ? "is-invalid" : ""}`;

  const toggleShowPassword = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={label}>{label}</label>
      <div className="input-group has-validation">
        <input
          className={getInputClasses()}
          type={type === "text" ? "text" : showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {type === "password" && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={toggleShowPassword}
          >
            <i className={`bi bi-eye${!showPassword ? "-slash" : ""}`}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default TextField;
