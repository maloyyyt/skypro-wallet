import { parseDateInput } from "./date";

// "1 500,50" не поддерживаем — только цифры, запятая или точка
export function parseSum(value) {
  return Number(value.trim().replace(",", "."));
}

export function validateExpenseForm({ category, date, sum }) {
  const errors = {};

  if (!category) {
    errors.category = true;
  }
  if (!parseDateInput(date)) {
    errors.date = true;
  }

  const sumValue = parseSum(sum);
  if (!Number.isFinite(sumValue) || sumValue <= 0) {
    errors.sum = true;
  }

  return errors;
}