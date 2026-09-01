import { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../../../utils/token";
import "../../../blocks/NavBar.css";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userData } =
    useContext(CurrentUserContext);

  const location = useLocation();
  const loginPage = location.pathname === "/signin";
  function handleLogin() {
    if (loginPage) {
      navigate("/signup");
    } else {
      navigate("/signin");
    }
  }
  function signOut() {
    removeToken();
    navigate("/signin");
    setIsLoggedIn(false);
  }
  return (
    <div className="NavBar">
      <ul className="navbar__nav">
        <li>
          <NavLink to="/" className="navbar__link">
            {isLoggedIn ? userData.email : ""}
          </NavLink>
        </li>
        <li>
          <button
            onClick={signOut}
            className={`navbar__link navbar__button ${isLoggedIn ? "" : "navbar__link_invisible"}`}
          >
            Cerrar sesión
          </button>
        </li>
        <li>
          <button
            onClick={handleLogin}
            className={`navbar__link navbar__button ${isLoggedIn ? "navbar__link_invisible" : ""}`}
          >
            {loginPage ? "Regístrate" : "Iniciar Sesión"}
          </button>
        </li>
      </ul>
    </div>
  );
}
export default NavBar;
