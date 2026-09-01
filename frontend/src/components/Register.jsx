import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import "../blocks/Register.css";
import Header from "./Header/Header";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Popup from "./Main/components/Popup/Popup";

const Register = ({ handleRegistration }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { popup, handleClosePopup } = useContext(CurrentUserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };
  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h1 className="form__title">Regístrate</h1>
        {/* <label htmlFor="email">Email:</label> */}
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
        />
        {/* <label htmlFor="password">Contraseña:</label> */}
        <input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        <div className="register__button-container">
          <button type="submit" className="register__link">
            Regístrate
          </button>
        </div>
      </form>
      <div className="register__signin">
        <Link to="/signin" className="register__login-link">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </div>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </div>
  );
};

export default Register;
