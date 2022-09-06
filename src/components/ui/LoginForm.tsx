import React, { useEffect, useState } from "react";
import * as yup from "yup";

import CheckBoxField from "../common/form/CheckBoxField";
import TextField from "../common/form/TextField";

type dataState = {
  email: string;
  password: string;
  stayOn: boolean;
};

const LoginForm: React.FC = () => {
  const validateScheme = yup.object().shape({
    password: yup
      .string()
      .required("Пароль обязателен для заполнения")
      .matches(
        /[A-Z]+/g,
        "Пароль должен содержать хотя бы одну заглавную букву"
      )
      .matches(/\d+/g, "Пароль должен содержать хотя бы одну цифру")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "Пароль должен содержать один из специальных символов (!@#$%^&*)"
      )
      .matches(/(?=.{8,})/, "Пароль должен содержать хотя бы 8 симолов"),
    email: yup
      .string()
      .required("Электронная почта почта обязательна для заполнения")
      .email("Email введен некорректно"),
  });

  const [data, setData] = useState<dataState>({
    email: "",
    password: "",
    stayOn: false,
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (target: any) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        label="Электронная почта"
        name="email"
        value={data.email}
        error={errors.email ? errors.email : null}
        onChange={handleChange}
      />

      <TextField
        type="password"
        label="Пароль"
        name="password"
        value={data.password}
        error={errors.password ? errors.password : null}
        onChange={handleChange}
      />

      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в сети
      </CheckBoxField>

      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Отправить
      </button>
    </form>
  );
};

export default LoginForm;
