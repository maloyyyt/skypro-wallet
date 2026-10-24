import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "skypro-wallet-transactions";
const INITIAL_TRANSACTIONS = [
  { id: "demo-1", description: "Пятерочка", category: "food", date: "03.07.2024", sum: 3500 },
  { id: "demo-2", description: "Яндекс Такси", category: "transport", date: "03.07.2024", sum: 730 },
  { id: "demo-3", description: "Аптека Вита", category: "others", date: "03.07.2024", sum: 1200 },
  { id: "demo-4", description: "Бургер Кинг", category: "food", date: "03.07.2024", sum: 950 },
  { id: "demo-5", description: "Деливери", category: "food", date: "02.07.2024", sum: 1320 },
  { id: "demo-6", description: "Кофейня №1", category: "food", date: "02.07.2024", sum: 400 },
  { id: "demo-7", description: "Бильярд", category: "joy", date: "29.06.2024", sum: 600 },
  { id: "demo-8", description: "Перекресток", category: "food", date: "29.06.2024", sum: 2360 },
  { id: "demo-9", description: "Лукойл", category: "transport", date: "29.06.2024", sum: 1000 },
  { id: "demo-10", description: "Летуаль", category: "others", date: "29.06.2024", sum: 4300 },
  { id: "demo-11", description: "Яндекс Такси", category: "transport", date: "28.06.2024", sum: 320 },
  { id: "demo-12", description: "Перекресток", category: "food", date: "28.06.2024", sum: 1360 },
  { id: "demo-13", description: "Деливери", category: "food", date: "28.06.2024", sum: 2320 },
  { id: "demo-14", description: "Вкусвилл", category: "food", date: "27.06.2024", sum: 1220 },
  { id: "demo-15", description: "Кофейня №1", category: "food", date: "27.06.2024", sum: 920 },
  { id: "demo-16", description: "Вкусвилл", category: "food", date: "26.06.2024", sum: 840 },
];

const TransactionsContext = createContext(null);

function readInitialTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Use demo data when local storage is unavailable or invalid.
  }
  return INITIAL_TRANSACTIONS;
}

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState(readInitialTransactions);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch {
      // The app remains usable if storage is unavailable.
    }
  }, [transactions]);

  const addTransaction = (transaction) => {
    const item = { ...transaction, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` };
    setTransactions((current) => [item, ...current]);
  };
  const deleteTransaction = (id) => {
    setTransactions((current) => current.filter((item) => item.id !== id));
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error("useTransactions должен использоваться внутри TransactionsProvider");
  return context;
}
