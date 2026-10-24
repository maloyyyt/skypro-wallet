import "./AuthInput.css";

function AuthInput({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
  const hasError = Boolean(error);
  // невидимая копия текста, чтобы звёздочка встала сразу после него
  const mirror = type === "password" ? "•".repeat(value.length) : value;

  return (
    <div className="auth-input">
      <input
        className={`auth-input__field${
          hasError ? " auth-input__field--error" : ""
        }`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={hasError}
      />
      {hasError && (
        <span className="auth-input__mark" aria-hidden="true">
          <span className="auth-input__mirror">
            {value ? mirror : placeholder}
          </span>
          *
        </span>
      )}
    </div>
  );
}

export default AuthInput;
