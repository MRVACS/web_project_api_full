import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import "../blocks/Login.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Popup from "./Main/components/Popup/Popup";

const Login = ({ handleLogin }) => {
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
    handleLogin(data);
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="form__title">Inicia sesión</h1>
        {/* <label htmlFor="email">Correo electrónico</label> */}
        <input
          id="email"
          required
          name="email"
          type="email"
          value={data.email}
          placeholder="Correo electrónico"
          onChange={handleChange}
        />
        {/* <label htmlFor="password">Contraseña:</label> */}
        <input
          id="password"
          required
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">
            Iniciar sesión
          </button>
        </div>
      </form>
      <div className="login__signup">
        <Link to="/signup" className="signup__link">
          ¿Aún no eres miembro? Regístrate aquí
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

export default Login;
