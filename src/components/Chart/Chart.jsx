import { formatMoney } from "../../utils/formatMoney";
import "./Chart.css";

const MAX_BAR_HEIGHT = 240;

function formatDate(date) {
  return date
    .toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(" г.", "");
}

function Chart({ range, data, isLoading, error }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const max = Math.max(...data.map((item) => item.value), 1);

  let content;
  if (error) {
    content = <p className="chart__status chart__status--error">{error}</p>;
  } else if (isLoading) {
    content = <p className="chart__status">Загрузка...</p>;
  } else {
    content = (
      <div className="chart__plot">
        {data.map((item) => {
          const height = Math.max((item.value / max) * MAX_BAR_HEIGHT, 3);
          return (
            <div className="chart__col" key={item.key}>
              <span className="chart__value">{formatMoney(item.value)}</span>
              <div
                className="chart__bar"
                style={{ height, background: item.color }}
              />
              <span className="chart__name">{item.name}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section className="card chart">
      <h2 className="chart__total">{formatMoney(total)}</h2>
      <p className="chart__period">
        Расходы за <b>{range.start && formatDate(range.start)}</b>
        {range.end && (
          <>
            {" — "}
            <b>{formatDate(range.end)}</b>
          </>
        )}
      </p>
      {content}
    </section>
  );
}

export default Chart;
