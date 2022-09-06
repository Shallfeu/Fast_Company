import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import API from "../../../api";

import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";
import { StateData } from "../usersListPage/UsersListPage";

type EditPageProps = {
  userInfo: StateData;
};

type dataState = {
  name: string;
  email: string;
  profession: string;
  sex: string;
  quality: {
    label: string;
    value: string;
    color: string;
  }[];
};

const EditPage: React.FC<EditPageProps> = ({ userInfo }) => {
  const hist = useHistory();

  const [data, setData] = useState<dataState>({
    name: "",
    email: "",
    profession: "",
    sex: "",
    quality: [],
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

    setData({
      name: userInfo.name,
      email: userInfo.email,
      profession: userInfo.profession._id,
      sex: userInfo.sex,
      quality: userInfo.qualities.map((el) => ({
        label: el.name,
        value: el._id,
        color: el.color,
      })),
    });
  }, []);

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

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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

  const handleRefresh = () => {
    const isValid = validate();
    if (!isValid) return;
    API.users.update(userInfo._id, {
      ...data,
      profession: getProfessionById(data.profession),
      quality: getQualities(data.quality),
    });
    hist.goBack();
  };

  return (
    <div className="container mt-5">
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
            defaultValue={data.quality}
            options={qualities}
            name="quality"
            onChange={handleChange}
            error={errors.quality ? errors.quality : null}
          />

          <button
            type="button"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
            onClick={handleRefresh}
          >
            Обновить
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
