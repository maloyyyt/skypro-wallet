const API_URL = "https://wedev-api.sky.pro/api/user";

async function request(url, payload, fallbackMessage) {
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Нет соединения с сервером");
  }

  const text = await response.text();
  let data = null;
  data
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.error || data?.message || fallbackMessage);
  }

  if (!data?.user) {
    throw new Error("Сервер вернул неожиданный ответ");
  }

  return data.user; // { login, name, token, ... }
}

export function registerUser({ name, login, password }) {
  return request(API_URL, { name, login, password }, "Ошибка регистрации");
}

export function loginUser({ login, password }) {
  return request(`${API_URL}/login`, { login, password }, "Ошибка входа");
}
