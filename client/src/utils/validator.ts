export function validator(data: {}, config: {}) {
  const errors = {};

  function validate(
    validateMethod: string,
    data: string,
    config: { message: string }
  ) {
    let validateStatus;

    switch (validateMethod) {
      case "isRequired":
        if (Array.isArray(data)) {
          validateStatus = data.length === 0;
        }
        if (typeof data === "string") {
          validateStatus = data?.trim() === "";
        }
        if (typeof data === "boolean") {
          validateStatus = !data;
        }
        break;

      case "isEmail": {
        const emailRegExp = /^\S+@\S+.\S+$/g;
        validateStatus = !emailRegExp.test(data);
        break;
      }

      case "isCapitalSymbol": {
        const capitalSymbolRegExp = /[A-Z]+/g;
        validateStatus = !capitalSymbolRegExp.test(data);
        break;
      }

      case "isContainDigit": {
        const containDigitRegExp = /\d+/g;
        validateStatus = !containDigitRegExp.test(data);
        break;
      }

      case "min": {
        validateStatus =
          data.length < (config as { message: string; value: number }).value;
        break;
      }

      default:
        break;
    }

    if (validateStatus) return config.message;
  }

  Object.keys(data).forEach((fieldName) => {
    if (!(config as any)[fieldName]) return;
    Object.keys((config as any)[fieldName]).forEach((validateMethod) => {
      const error = validate(
        validateMethod,
        (data as any)[fieldName],
        (config as any)[fieldName][validateMethod]
      );

      if (error && !(errors as any)[fieldName])
        (errors as any)[fieldName] = error;
    });
  });

  return errors;
}

// const validatorConfig = {
//   email: {
//     isRequired: {
//       message: "Электронная почта почта обязательна для заполнения",
//     },

//     isEmail: {
//       message: "Email введен некорректно",
//     },
//   },

//   password: {
//     isRequired: {
//       message: "Пароль обязателен для заполнения",
//     },

//     isCapitalSymbol: {
//       message: "Пароль должен содержать хотя бы одну заглавную букву",
//     },

//     isContainDigit: {
//       message: "Пароль должен содержать хотя бы одну цифру",
//     },

//     min: {
//       message: "Пароль должен содержать хотя бы 8 симолов",
//       value: 8,
//     },
//   },

//   profession: {
//     isRequired: {
//       message: "Профессия обязательно должна быть выбрана",
//     },
//   },

//   sex: {
//     isRequired: {
//       message: "Пол обязательно должен быть выбран",
//     },
//   },

//   quality: {
//     isRequired: {
//       message: "Хотя бы одно качество должно быть выбрано",
//     },
//   },

//   licence: {
//     isRequired: {
//       message:
//         "Вы не сможете продолжить, если не подтвердите лицензионное соглашение",
//     },
//   },
// };
