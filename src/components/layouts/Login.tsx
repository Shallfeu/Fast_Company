import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../TextField";

type dataState = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [data, setData] = useState<dataState>({ email: "", password: "" });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта почта обязательна для заполнения",
      },

      isEmail: {
        message: "Email введен некорректно",
      },
    },

    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },

      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },

      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру",
      },

      min: {
        message: "Пароль должен содержать хотя бы 8 симолов",
        value: 8,
      },
    },
  };

  const validate = () => {
    const newErrors = validator(data, validatorConfig);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = ({ target }: any) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              label="Электронная почта"
              name="email"
              value={data.email}
              error={errors?.email}
              onChange={handleChange}
            />
            <TextField
              type="password"
              label="Пароль"
              name="password"
              value={data.password}
              error={errors?.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
