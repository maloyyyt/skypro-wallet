import { useState } from "react";
import { CATEGORIES } from "../../constants/categories";
import { useTransactions } from "../../context/TransactionsContext";
import { parseDateInput } from "../../utils/date";
import { parseSum, validateExpenseForm } from "../../utils/expenseValidation";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import "./ExpenseForm.css";

const TODAY = new Date();
const TODAY_STRING = `${String(TODAY.getDate()).padStart(2, "0")}.${String(TODAY.getMonth() + 1).padStart(2, "0")}.${TODAY.getFullYear()}`;

function ExpenseForm() {
  const { addTransaction } = useTransactions();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(TODAY_STRING);
  const [sum, setSum] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = { description, category, date, sum };
    const validationErrors = validateExpenseForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    const parsedDate = parseDateInput(date);
    addTransaction({
      description: description.trim(),
      category,
      date: `${String(parsedDate.getDate()).padStart(2, "0")}.${String(parsedDate.getMonth() + 1).padStart(2, "0")}.${parsedDate.getFullYear()}`,
      sum: parseSum(sum),
    });
    setDescription("");
    setCategory("");
    setDate(TODAY_STRING);
    setSum("");
    setErrors({});
  };

  const change = (field, setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <form className="card expense-form" onSubmit={handleSubmit} noValidate>
      <h2 className="card-title">Новый расход</h2>
      <label className="expense-form__label" htmlFor="description">Описание</label>
      <input id="description" className="expense-form__input" type="text" placeholder="Введите описание" value={description} onChange={change("description", setDescription)} />

      <span className={`expense-form__label${errors.category ? " expense-form__label--error" : ""}`}>Категория{errors.category && <span className="expense-form__asterisk">*</span>}</span>
      <div className="expense-form__categories">
        {CATEGORIES.map((item) => (
          <button key={item.key} type="button" className={`expense-form__chip${category === item.key ? " expense-form__chip--active" : ""}${errors.category ? " expense-form__chip--error" : ""}`} onClick={() => { setCategory(item.key); setErrors((prev) => ({ ...prev, category: false })); }}>
            <CategoryIcon name={item.key} />{item.label}
          </button>
        ))}
      </div>

      <label className={`expense-form__label${errors.date ? " expense-form__label--error" : ""}`} htmlFor="date">Дата{errors.date && <span className="expense-form__asterisk">*</span>}</label>
      <input id="date" className={`expense-form__input${errors.date ? " expense-form__input--error" : ""}`} type="text" placeholder="ДД.ММ.ГГГГ" value={date} onChange={change("date", setDate)} aria-invalid={Boolean(errors.date)} />

      <label className={`expense-form__label${errors.sum ? " expense-form__label--error" : ""}`} htmlFor="sum">Сумма{errors.sum && <span className="expense-form__asterisk">*</span>}</label>
      <input id="sum" className={`expense-form__input${errors.sum ? " expense-form__input--error" : ""}`} type="text" inputMode="decimal" placeholder="Введите сумму" value={sum} onChange={change("sum", setSum)} aria-invalid={Boolean(errors.sum)} />

      <button className={`expense-form__submit${Object.values(errors).some(Boolean) ? " expense-form__submit--invalid" : ""}`} type="submit">Добавить новый расход</button>
    </form>
  );
}

export default ExpenseForm;
