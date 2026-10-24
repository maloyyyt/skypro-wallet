import ExpensesTable from "../components/ExpensesTable/ExpensesTable";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import "./MainPage.css";

function MainPage() {
  return (
    <div>
      <h1 className="page-title">Мои расходы</h1>
      <div className="main-grid">
        <ExpensesTable />
        <ExpenseForm />
      </div>
    </div>
  );
}

export default MainPage;
