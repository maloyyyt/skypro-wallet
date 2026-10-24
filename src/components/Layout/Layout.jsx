import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./Layout.css";

function Layout() {
  return (
    <>
      <Header />
      <main className="container layout__main">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
