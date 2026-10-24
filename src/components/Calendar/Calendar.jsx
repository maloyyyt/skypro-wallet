import { parseDateInput } from "../../utils/date";
import "./Calendar.css";

const WEEKDAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

function getMonthTitle(year, month) {
  const name = new Date(year, month, 1).toLocaleDateString("ru-RU", {
    month: "long",
  });
  return `${name[0].toUpperCase()}${name.slice(1)} ${year}`;
}

function getMonths(transactions, range) {
  const dates = transactions
    .map((item) => parseDateInput(item.date))
    .filter(Boolean);
  if (range.start) dates.push(range.start);
  if (range.end) dates.push(range.end);

  if (!dates.length) {
    const today = new Date();
    dates.push(today);
  }

  const min = new Date(Math.min(...dates.map((date) => date.getTime())));
  const max = new Date(Math.max(...dates.map((date) => date.getTime())));
  const months = [];
  let year = min.getFullYear();
  let month = min.getMonth();
  const endIndex = max.getFullYear() * 12 + max.getMonth();

  while (year * 12 + month <= endIndex) {
    months.push([year, month]);
    month += 1;
    if (month === 12) {
      month = 0;
      year += 1;
    }
  }
  return months;
}

function Calendar({ range, onChange, transactions = [] }) {
  const months = getMonths(transactions, range);

  const isActive = (date) => {
    const t = date.getTime();
    const s = range.start?.getTime();
    const e = range.end?.getTime();
    if (s == null) return false;
    if (e == null) return t === s;
    return t >= s && t <= e;
  };

  const handleClick = (date) => {
    const { start, end } = range;
    if (!start || end) {
      onChange({ start: date, end: null });
    } else if (date < start) {
      onChange({ start: date, end: start });
    } else {
      onChange({ start, end: date });
    }
  };

  return (
    <section className="card calendar">
      <h2 className="card-title">Период</h2>
      <div className="calendar__weekdays">
        {WEEKDAYS.map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="calendar__scroll scroll">
        {months.map(([year, month]) => {
          const daysCount = new Date(year, month + 1, 0).getDate();
          const offset = (new Date(year, month, 1).getDay() + 6) % 7;

          return (
            <div key={`${year}-${month}`}>
              <h3 className="calendar__month">{getMonthTitle(year, month)}</h3>
              <div className="calendar__days">
                {Array.from({ length: offset }, (_, i) => <span key={`empty-${i}`} />)}
                {Array.from({ length: daysCount }, (_, i) => {
                  const date = new Date(year, month, i + 1);
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`calendar__day${isActive(date) ? " calendar__day--active" : ""}`}
                      onClick={() => handleClick(date)}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Calendar;
