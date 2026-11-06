import { NavLink } from "react-router";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div>
      <nav>
        <NavLink to="/" end>
          Home Page
        </NavLink>
        <NavLink to="/lessons" end>
          Lesson Page
        </NavLink>
        <NavLink to="/auth" end>
          Login Page
        </NavLink>
        <NavLink to="/practice" end>
          Practice Page
        </NavLink>
      </nav>
      <Outlet />
      <footer></footer>
    </div>
  );
}
