const DOTTED_DATE_PATTERN = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
const ISO_DATE_PATTERN = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:T.*)?$/;

// Поддерживает пользовательский формат ДД.ММ.ГГГГ и даты из API ISO YYYY-MM-DD.
export function parseDateInput(value) {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime())
      ? null
      : new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }
  if (typeof value !== "string") return null;

  const input = value.trim();
  let day;
  let month;
  let year;
  const dotted = DOTTED_DATE_PATTERN.exec(input);
  const iso = ISO_DATE_PATTERN.exec(input);

  if (dotted) {
    [, day, month, year] = dotted;
  } else if (iso) {
    [, year, month, day] = iso;
  } else {
    return null;
  }

  day = Number(day);
  month = Number(month);
  year = Number(year);
  const date = new Date(year, month - 1, day);
  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isRealDate ? date : null;
}

// Date -> "7-4-2024" (формат, который ждёт API: месяц-день-год)
export function toApiDate(date) {
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

// "2025-12-11T21:00:00.000Z" -> "12.12.2025"
export function formatDisplayDate(isoString) {
  return new Date(isoString).toLocaleDateString("ru-RU");
}
