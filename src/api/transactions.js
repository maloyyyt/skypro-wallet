import { request } from "./http";

// API принимает даты как «месяц-день-год», например 6-1-2025
function toApiDate(date) {
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

export function getTransactionsByPeriod(token, { start, end }) {
  return request("/transactions/period", {
    method: "POST",
    token,
    body: { start: toApiDate(start), end: toApiDate(end) },
  });
}
