import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../Logo/Logo";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo />
        <nav className="header__nav">
          <NavLink to="/" end className="header__link">
            Мои расходы
          </NavLink>
          <NavLink to="/analytics" className="header__link">
            Анализ расходов
          </NavLink>
        </nav>
        <button className="header__logout" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </header>
  );
}

export default Header;
