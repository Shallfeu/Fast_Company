import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";

import API from "../../../api";

import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";
import BackHistoryBtn from "../../common/BackHistoryBtn";

type dataState = {
  name: string;
  email: string;
  profession: string;
  sex: string;
  qualities: {
    label: string;
    value: string;
    color: string;
  }[];
};

const EditPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const hist = useHistory();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<dataState>({
    name: "",
    email: "",
    profession: "",
    sex: "",
    qualities: [],
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    profession?: string;
    sex?: string;
    quality?: string;
  }>({});

  const [qualities, setQualities] = useState<
    {
      label: string;
      value: string;
      color: string;
    }[]
  >([]);

  const [professions, setProfessions] = useState<
    { label: string; value: string }[]
  >([]);

  const validateScheme = yup.object().shape({
    email: yup
      .string()
      .required("Электронная почта почта обязательна для заполнения")
      .email("Email введен некорректно"),

    name: yup.string().required("Имя должно быть введено"),
  });

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const transformData = (data: { name: string; _id: string }[]) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }));
  };

  const handleChange = (target: any) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const getProfessionById = (id: string) => {
    const prof: { label: string; value: string }[] = professions.filter(
      (prof) => prof.value === id
    );
    return { _id: prof[0].value, name: prof[0].label };
  };

  const getQualities = (
    elements: {
      label: string;
      value: string;
      color: string;
    }[]
  ) => {
    const qualitiesArray: {
      _id: string;
      name: string;
      color: string;
    }[] = [];

    elements.forEach((elem: { value: string; label: string }) => {
      qualities.forEach(
        (qual: { label: string; value: string; color: string }) => {
          if (elem.value === qual.value) {
            qualitiesArray.push({
              _id: qual.value,
              name: qual.label,
              color: qual.color,
            });
          }
        }
      );
    });

    return qualitiesArray;
  };

  const handleRefresh = (e: any) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    API.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then((data) => hist.push(`/users/${data._id}`));
    // console.log({
    //   ...data,
    //   profession: getProfessionById(profession),
    //   qualities: getQualities(qualities),
    // });
  };

  useEffect(() => {
    setLoading(true);

    API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id,
      }));
      setProfessions(professionsList);
    });

    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color,
      }));
      setQualities(qualitiesList);
    });

    API.users
      .getById(userId)
      .then(({ profession, qualities, ...data }) =>
        setData((prevState) => ({
          ...prevState,
          ...data,
          qualities: transformData(qualities),
          profession: profession._id,
        }))
      )
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container mt-5">
      <BackHistoryBtn />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form>
            <TextField
              type="text"
              label="Имя"
              name="name"
              value={data.name}
              error={errors.name ? errors.name : null}
              onChange={handleChange}
            />

            <TextField
              type="text"
              label="Электронная почта"
              name="email"
              value={data.email}
              error={errors.email ? errors.email : null}
              onChange={handleChange}
            />

            <SelectField
              label="Выберите вашу профессию"
              name="profession"
              value={data.profession}
              options={professions}
              onChange={handleChange}
              defaultOption={
                professions.find((el) => el.value === data.profession)
                  ?.label as string
              }
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
              defaultValue={data.qualities}
              options={qualities}
              name="qualities"
              onChange={handleChange}
              error={errors.quality ? errors.quality : null}
            />

            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
              onClick={handleRefresh}
            >
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
