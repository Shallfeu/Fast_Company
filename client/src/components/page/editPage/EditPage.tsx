import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as yup from "yup";

import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";
import BackHistoryBtn from "../../common/BackHistoryBtn";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getQualities,
  getQualitiesLoading,
} from "../../../store/qualitiesSlice/selectors";
import {
  getProfessions,
  getProfessionsLoading,
} from "../../../store/professionsSlice/selectors";
import { getCurrentUserData } from "../../../store/usersSlice/selectors";
import { UpdateData } from "../../../store/usersSlice/actions";

type HookProps = {
  userId: string;
};

const EditPage: React.FC = () => {
  const hist = useHistory();

  const dispatch = useAppDispatch();

  const { userId } = useParams<HookProps>();

  const [data, setData] = useState<{
    name: string;
    email: string;
    profession: string;
    sex: string;
    qualities: { label: string; value: string; color: string }[];
  } | null>(null);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    profession?: string;
    sex?: string;
    qualities?: string;
  }>({});

  const qualities = useAppSelector(getQualities());
  const qLoad = useAppSelector(getQualitiesLoading());

  const professions = useAppSelector(getProfessions());
  const pLoad = useAppSelector(getProfessionsLoading());

  const currentUser = useAppSelector(getCurrentUserData);

  const validateScheme = yup.object().shape({
    email: yup
      .string()
      .required("Электронная почта почта обязательна для заполнения")
      .email("Email введен некорректно"),

    name: yup.string().required("Имя должно быть введено"),
  });

  function validate() {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  }

  useEffect(() => {
    validate();
  }, [data]);

  useEffect(() => {
    if (!qLoad && !pLoad && currentUser && !data) {
      setData({
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: transformQual(
          getQualitiesListByIds(currentUser.qualities)
        ) || [{ label: "string", value: "string", color: "string" }],
      });
    }
  }, []);

  if (currentUser?._id !== userId)
    return <Redirect to={`/users/${currentUser?._id}/edit`} />;

  function transformQual(
    data: { name: string; _id: string; color: string }[] | null
  ) {
    if (data)
      return data.map((qual) => ({
        label: qual.name,
        value: qual._id,
        color: qual.color,
      }));
  }

  function transformProf(data: { name: string; _id: string }[]) {
    return data.map((qual) => ({
      label: qual.name,
      value: qual._id,
    }));
  }

  function getQualitiesListByIds(qualitiesIds: any) {
    const qualitiesArray = [];
    if (!qualities) return null;
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }

    return qualitiesArray;
  }

  const handleChange = (target: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleRefresh = (e: any) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(
      UpdateData({
        ...currentUser,
        name: data?.name,
        email: data?.email,
        profession: data?.profession,
        sex: data?.sex,
        qualities: data?.qualities.map((el) => el.value),
      })
    );
    hist.push(`/users/${currentUser?._id}`);
  };

  if (!data) return <>Loading...</>;
  if (!qualities || !professions) return <>Loading...</>;

  const isValid = Object.keys(errors).length === 0;
  const transQual = transformQual(qualities);
  const transProf = transformProf(professions);

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
              options={transProf}
              onChange={handleChange}
              defaultOption={
                transformProf(professions).find(
                  (el) => el.value === data.profession
                )?.label as string
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

            {!qLoad && (
              <MultiSelectField
                label="Выберите ваши качества"
                defaultValue={data.qualities}
                options={transQual}
                name="qualities"
                onChange={handleChange}
                error={errors.qualities ? errors.qualities : null}
              />
            )}

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
