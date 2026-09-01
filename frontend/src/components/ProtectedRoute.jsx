import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn } = useContext(CurrentUserContext);
  if (anonymous && isLoggedIn) {
    // Si el usuario ha iniciado la sesión le redirigimos fuera de nuestras
    // rutas anónimas.
    return <Navigate to={from} />;
  }
  if (!anonymous && !isLoggedIn) {
    // Mientras redirigimos a /login establecemos los objetos location
    // la propiedad state.from para almacenar el valor de la ubicación actual.
    // Esto nos permite redirigirles correctamente después de que
    // inicien sesión.
    return <Navigate to="/signin" state={{ from: location }} />;
  }
  return children;
}
