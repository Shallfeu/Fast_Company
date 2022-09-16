import React, { useEffect, useState } from "react";
import * as yup from "yup";

import API from "../../api";

import TextField from "../common/form/TextField";
import SelectField from "../common/form/SelectField";
import RadioField from "../common/form/RadioField";
import MultiSelectField from "../common/form/MultiSelectField";
import CheckBoxField from "../common/form/CheckBoxField";

type dataState = {
  email: string;
  password: string;
  profession: string;
  sex: string;
  quality: [];
  licence: false;
};

type QualitiesObj = {
  label: string;
  value: string;
  color: string;
};

const RegisterForm: React.FC = () => {
  const validateScheme = yup.object().shape({
    licence: yup
      .bool()
      .oneOf(
        [true],
        "Вы не сможете продолжить, если не подтвердите лицензионное соглашение"
      ),

    quality: yup.array().min(1, "Хотя бы одно качество должно быть выбрано"),

    sex: yup.string().required("Пол обязательно должен быть выбран"),

    profession: yup
      .string()
      .required("Профессия обязательно должна быть выбрана"),

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
    profession: "",
    sex: "",
    quality: [],
    licence: false,
  });

  const [qualities, setQualities] = useState<QualitiesObj[]>([]);

  const [professions, setProfessions] = useState<
    { label: string; value: string }[]
  >([]);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    profession?: string;
    sex?: string;
    quality?: string;
    licence?: string;
  }>({});

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id,
      }));
      setProfessions(professionsList);
    });
    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color,
      }));
      setQualities(qualitiesList);
    });
  });

  // const getProfessionById = (id: string) => {
  //   const prof: { label: string; value: string }[] = professions.filter(
  //     (prof) => prof.value === id
  //   );
  //   return { _id: prof[0].value, name: prof[0].label };
  // };

  // const getQualities = (elements: []) => {
  //   const qualitiesArray: {
  //     _id: string;
  //     name: string;
  //     color: string;
  //   }[] = [];

  //   elements.forEach((elem: { value: string; label: string }) => {
  //     qualities.forEach((qual: QualitiesObj) => {
  //       if (elem.value === qual.value) {
  //         qualitiesArray.push({
  //           _id: qual.value,
  //           name: qual.label,
  //           color: qual.color,
  //         });
  //       }
  //     });
  //   });

  //   return qualitiesArray;
  // };

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
    if (!isValid) return null;
    // const { profession, quality } = data;

    // console.log({
    //   ...data,
    //   profession: getProfessionById(profession),
    //   quality: getQualities(quality),
    // });
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

      <SelectField
        label="Выберите вашу профессию"
        name="profession"
        value={data.profession}
        options={professions}
        onChange={handleChange}
        defaultOption="Choose..."
        error={errors.profession ? errors.profession : null}
      />

      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
        label="Выберите ваш пол"
        value={data.sex}
        name="sex"
        error={errors.sex ? errors.sex : null}
        onChange={handleChange}
      />

      <MultiSelectField
        label="Выберите ваши качества"
        defaultValue={data.quality}
        options={qualities}
        name="quality"
        onChange={handleChange}
        error={errors.quality ? errors.quality : null}
      />

      <CheckBoxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence ? errors.licence : null}
      >
        <>
          Подтвердить <a>лицензионное соглашение</a>
        </>
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

export default RegisterForm;
