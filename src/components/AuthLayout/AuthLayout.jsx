import { Outlet } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./AuthLayout.css";

function AuthLayout() {
  return (
    <div className="auth">
      <header className="auth__header">
        <div className="container">
          <Logo />
        </div>
      </header>
      <main className="auth__main">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
