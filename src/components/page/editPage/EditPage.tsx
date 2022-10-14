import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as yup from "yup";

import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";
import BackHistoryBtn from "../../common/BackHistoryBtn";
import { useQuality } from "../../../hooks/useQuality";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

type HookProps = {
  userId: string;
};

const EditPage: React.FC = () => {
  const hist = useHistory();
  const { userId } = useParams<HookProps>();

  const { currentUser, updateData } = useAuth();

  const [data, setData] = useState<{
    name: string;
    email: string;
    profession: string;
    sex: string;
    quality: { label: string; value: string; color: string }[];
  }>({
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

  const validateScheme = yup.object().shape({
    email: yup
      .string()
      .required("Электронная почта почта обязательна для заполнения")
      .email("Email введен некорректно"),

    name: yup.string().required("Имя должно быть введено"),
  });

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (currentUser)
      setData({
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex,
        quality: transformQual(
          currentUser.quality.map((qual) => getQualityById(qual))
        ),
      });
  }, []);

  const { qualities, getQualityById } = useQuality();

  const { professions } = useProfession();

  if (currentUser?._id !== userId)
    return <Redirect to={`/users/${currentUser?._id}/edit`} />;

  function validate() {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  }

  function transformQual(data: { name: string; _id: string; color: string }[]) {
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

  const handleChange = (target: any) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  // const getProfessionById = (id: string) => {
  //   const prof = professions.filter((prof) => prof._id === id);
  //   return prof;
  // };

  // const getQualities = (
  //   elements: {
  //     label: string;
  //     value: string;
  //     color: string;
  //   }[]
  // ) => {
  //   const qualitiesArray: {
  //     _id: string;
  //     name: string;
  //     color: string;
  //   }[] = [];

  //   elements.forEach((elem: { value: string; label: string }) => {
  //     transformQual(qualities).forEach((qual) => {
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

  const handleRefresh = (e: any) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    updateData({
      ...currentUser,
      name: data.name,
      email: data.email,
      profession: data.profession,
      sex: data.sex,
      quality: data.quality.map((el) => el.value),
    });
    hist.push(`/users/${currentUser?._id}`);
  };

  const isValid = Object.keys(errors).length === 0;

  const transQual = transformQual(qualities);
  const transProf = transformProf(professions);

  if (!data) return <>loading</>;

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

            <MultiSelectField
              label="Выберите ваши качества"
              defaultValue={data.quality}
              options={transQual}
              name="quality"
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
