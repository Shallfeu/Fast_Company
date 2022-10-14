import React, { useEffect, useState } from "react";
import * as yup from "yup";

import TextAreaField from "../form/TextAreaField";

type dataState = {
  content: string;
};

type CommentFormProps = {
  onSubmit: (data: { content: string }) => void;
};

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const validateScheme = yup.object().shape({
    content: yup.string().required("Нельзя отправлять пустые комментарии"),
  });

  const [data, setData] = useState<dataState>({ content: "" });

  const [errors, setErrors] = useState<{
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
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (target: any) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const clearArea = () => {
    setData({ content: "" });
    setErrors({});
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    if (data) onSubmit(data);
    clearArea();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextAreaField
        label="Сообщение"
        name="content"
        rows={3}
        value={data?.content || ""}
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
