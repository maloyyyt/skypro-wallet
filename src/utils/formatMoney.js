export function formatMoney(value) {
  return `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
}
