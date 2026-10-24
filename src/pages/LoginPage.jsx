import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import AuthInput from "../components/AuthInput/AuthInput";
import { useAuth } from "../hooks/useAuth";
import { validateLoginForm } from "../utils/validation";

const ERROR_MESSAGE =
  "Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.";

function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [values, setValues] = useState({ login: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hasFieldErrors = Object.values(errors).some(Boolean);
  const hasError = hasFieldErrors || Boolean(serverError);
  const message = hasFieldErrors ? ERROR_MESSAGE : serverError;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Не показываем ошибку формата почты до первой попытки входа.
    // После отправки формы изменение поля убирает его старую ошибку.
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    try {
      const user = await loginUser({
        login: values.login.trim(),
        password: values.password,
      });
      signIn(user);
      navigate("/", { replace: true });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1 className="auth-card__title">Вход</h1>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthInput
          name="login"
          type="email"
          placeholder="Эл. почта"
          value={values.login}
          onChange={handleChange}
          error={errors.login}
        />
        <AuthInput
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
          error={errors.password || serverError}
        />
        {message && <p className="auth-form__error">{message}</p>}
        <button
          className="auth-button"
          type="submit"
          disabled={isLoading || hasError}
        >
          {isLoading ? "Входим..." : "Войти"}
        </button>
      </form>
      <div className="auth-card__footer">
        <span>Нужно зарегистрироваться?</span>
        <Link className="auth-card__link" to="/register">
          Регистрируйтесь здесь
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
