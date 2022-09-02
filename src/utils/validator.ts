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
        validateStatus = data.trim() === "";
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
