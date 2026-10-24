import { CATEGORIES } from "../../constants/categories";
import { useTransactions } from "../../context/TransactionsContext";
import { formatMoney } from "../../utils/formatMoney";
import "./ExpensesTable.css";

function TrashIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M4 1h4l.5 1H11v1.2H1V2h2.5L4 1Zm-2.2 3h8.4l-.6 7H2.4l-.6-7Z" />
    </svg>
  );
}

function ExpensesTable() {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <section className="card expenses-table">
      <h2 className="card-title">Таблица расходов</h2>
      <div className="expenses-table__row expenses-table__row--head">
        <span>Описание</span><span>Категория</span><span>Дата</span><span>Сумма</span><span />
      </div>
      <div className="expenses-table__body scroll">
        {transactions.length === 0 ? <p className="expenses-table__empty">Расходов пока нет</p> : transactions.map((item) => (
          <div className="expenses-table__row" key={item.id}>
            <span>{item.description}</span>
            <span>{CATEGORIES.find((category) => category.key === item.category)?.label ?? item.category}</span>
            <span>{item.date}</span>
            <span>{formatMoney(item.sum)}</span>
            <button className="expenses-table__delete" type="button" aria-label={`Удалить расход: ${item.description}`} onClick={() => deleteTransaction(item.id)}>
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExpensesTable;
