import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import CheckBoxField from "../common/form/CheckBoxField";
import TextField from "../common/form/TextField";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { signIn } from "../../store/usersSlice/actions";
import { getAuthErrors } from "../../store/usersSlice/selectors";

type dataState = {
  email: string;
  password: string;
  stayOn: boolean;
};

const LoginForm: React.FC = () => {
  const history = useHistory<any>();
  const dispatch = useAppDispatch();

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

  const loginError = useAppSelector(getAuthErrors);

  const [error, setError] = useState<{
    email?: string;
    password?: string;
    manyAttempts?: string;
  }>({});

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setError({}))
      .catch((err) => setError({ [err.path]: err.message }));
    return Object.keys(error).length === 0;
  };

  const isValid = Object.keys(error).length === 0;

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
    if (!isValid) return null;
    const redirect = history?.location?.state?.from?.pathname;
    dispatch(signIn({ ...data, redirect }));
  };

  if (error.manyAttempts) console.log("dfgdf");

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        label="Электронная почта"
        name="email"
        value={data.email}
        error={error.email ? error.email : null}
        onChange={handleChange}
      />

      <TextField
        type="password"
        label="Пароль"
        name="password"
        value={data.password}
        error={error.password ? error.password : null}
        onChange={handleChange}
      />

      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в сети
      </CheckBoxField>

      {loginError ? <p className="text-danger">{loginError}</p> : ""}

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
