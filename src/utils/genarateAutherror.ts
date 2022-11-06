export function generateAuthError(message: string) {
  switch (message) {
    case "EMAIL_NOT_FOUND":
      return "Пользователя с таким Email не существует";

    case "INVALID_PASSWORD":
      return "Неверный пароль";

    case "EMAIL_EXISTS":
      return "Пользователь с таким Email уже существует";

    default:
      return "Слишком много попыток входа, попробуйте позже";
  }
}
