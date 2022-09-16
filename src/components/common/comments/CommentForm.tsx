import React, { useEffect, useState } from "react";
import * as yup from "yup";

import API from "../../../api";

import SelectField from "../form/SelectField";
import TextAreaField from "../form/TextAreaField";

type dataState = {
  userId: string;
  content: string;
};

type CommentFormProps = {
  onSubmit: (data: { userId: string; content: string }) => void;
};

const initialState = {
  userId: "",
  content: "",
};

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const validateScheme = yup.object().shape({
    content: yup.string().required("Нельзя отправлять пустые комментарии"),
    userId: yup.string().required("Пользователь должен быть выбран"),
  });

  const [users, setUsers] = useState();

  const [data, setData] = useState<dataState>(initialState);

  const [errors, setErrors] = useState<{
    userId?: string;
    content?: string;
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
    API.users.fetchAll().then((data) => {
      setUsers(
        data.map((user: { name: string; _id: string }) => ({
          label: user.name,
          value: user._id,
        }))
      );
    });
  }, []);

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (target: any) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const clearArea = () => {
    setData(initialState);
    setErrors({});
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    if (data) onSubmit(data);
    clearArea();
  };

  if (!users) return <h4>Loading...</h4>;

  return (
    <form onSubmit={handleSubmit}>
      <SelectField
        label=""
        value={data.userId}
        onChange={handleChange}
        name="userId"
        defaultOption="Выберите пользователя"
        options={users}
        error={errors.userId ? errors.userId : null}
      />

      <TextAreaField
        label="Сообщение"
        name="content"
        rows={3}
        value={data.content}
        error={errors.content ? errors.content : null}
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
  );
};

export default CommentForm;
