import { useMemo, useState } from "react";
import Calendar from "../components/Calendar/Calendar";
import Chart from "../components/Chart/Chart";
import { useTransactions } from "../context/TransactionsContext";
import { buildChartData } from "../utils/buildChartData";
import { parseDateInput } from "../utils/date";
import "./AnalyticsPage.css";

function getInitialRange(transactions) {
  const dates = transactions
    .map((item) => parseDateInput(item.date))
    .filter(Boolean)
    .sort((a, b) => a - b);

  if (dates.length) {
    return {
      start: new Date(dates[0].getFullYear(), dates[0].getMonth(), dates[0].getDate()),
      end: new Date(dates[dates.length - 1].getFullYear(), dates[dates.length - 1].getMonth(), dates[dates.length - 1].getDate()),
    };
  }

  const today = new Date();
  return {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: new Date(today.getFullYear(), today.getMonth() + 1, 0),
  };
}

function AnalyticsPage() {
  const { transactions } = useTransactions();
  const [range, setRange] = useState(() => getInitialRange(transactions));

  const periodTransactions = useMemo(() => {
    if (!range.start) return [];
    const start = new Date(range.start.getFullYear(), range.start.getMonth(), range.start.getDate());
    const lastDay = range.end ?? range.start;
    const end = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate(), 23, 59, 59, 999);

    return transactions.filter((item) => {
      const date = parseDateInput(item.date);
      return date && date >= start && date <= end;
    });
  }, [transactions, range]);

  const chartData = useMemo(() => buildChartData(periodTransactions), [periodTransactions]);

  return (
    <div>
      <h1 className="page-title">Анализ расходов</h1>
      <div className="analytics-grid">
        <Calendar range={range} onChange={setRange} transactions={transactions} />
        <Chart range={range} data={chartData} isLoading={false} error="" />
      </div>
    </div>
  );
}

export default AnalyticsPage;
