import { CATEGORIES } from "../constants/categories";

const CATEGORY_ALIASES = {
  food: ["food", "еда", "продукты", "питание"],
  transport: ["transport", "транспорт", "такси", "бензин"],
  housing: ["housing", "жильё", "жилье", "дом", "коммунальные услуги"],
  joy: ["joy", "развлечения", "досуг"],
  education: ["education", "образование", "учёба", "учеба"],
  others: ["others", "other", "другое", "прочее", "прочие расходы"],
};

function getCategoryKey(category) {
  const raw = typeof category === "object" && category !== null
    ? category.key ?? category.value ?? category.name ?? category.label
    : category;
  const normalized = String(raw ?? "").trim().toLocaleLowerCase("ru-RU");
  return CATEGORIES.find(({ key }) => CATEGORY_ALIASES[key]?.includes(normalized))?.key
    ?? CATEGORIES.find(({ key }) => key === normalized)?.key
    ?? null;
}

function getAmount(transaction) {
  const raw = transaction.sum ?? transaction.amount ?? transaction.value ?? 0;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : 0;
  const normalized = String(raw).replace(/[\s₽]/g, "").replace(",", ".");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

export function buildChartData(transactions = []) {
  const totals = Object.fromEntries(CATEGORIES.map(({ key }) => [key, 0]));

  transactions.forEach((transaction) => {
    const key = getCategoryKey(transaction.category ?? transaction.categoryName);
    if (key) totals[key] += getAmount(transaction);
  });

  return CATEGORIES.map(({ key, label, color }) => ({
    key,
    name: label,
    color,
    value: totals[key],
  }));
}
