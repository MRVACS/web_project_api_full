import { Link } from "react-router-dom";
import Logo from "./Logo/Logo";
import NavBar from "./NavBar/NavBar";

import headerLogo from "../../assets/images/Vector.png";
import separationLine from "../../assets/images/Line.png";

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <Logo />
        <NavBar className="header__NavBar" />
      </div>
      <img
        src={separationLine}
        className="header__line"
        alt="Línea de separación"
      />
    </header>
  );
}
export default Header;
