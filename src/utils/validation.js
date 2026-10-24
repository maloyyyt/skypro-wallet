const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_NAME_LENGTH = 2;
const MIN_PASSWORD_LENGTH = 6;

export function validateLoginForm({ login, password }) {
  const errors = {};

  if (!login.trim()) {
    errors.login = "Введите эл. почту";
  } else if (!EMAIL_REGEXP.test(login.trim())) {
    errors.login = "Введите корректный адрес эл. почты";
  }
  if (!password) errors.password = "Введите пароль";

  return errors;
}

export function validateRegisterForm({ name, login, password }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Введите имя";
  } else if (name.trim().length < MIN_NAME_LENGTH) {
    errors.name = `Имя должно содержать минимум ${MIN_NAME_LENGTH} символа`;
  }

  if (!login.trim()) {
    errors.login = "Введите эл. почту";
  } else if (!EMAIL_REGEXP.test(login.trim())) {
    errors.login = "Введите корректный адрес эл. почты";
  }

  if (!password) {
    errors.password = "Введите пароль";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Пароль должен содержать минимум ${MIN_PASSWORD_LENGTH} символов`;
  }

  return errors;
}
