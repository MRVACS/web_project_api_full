import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Login from "./Login.jsx";
import Register from "./Register.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

import * as auth from "../utils/auth.js";
import api from "../utils/api";
import { setToken, getToken } from "../utils/token";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import newApi from "../utils/api.js";
import ImagePopup from "./Main/components/ImagePopup/ImagePopup.jsx";
import okImage from "../assets/images/Ok.png";
import errorImage from "../assets/images/Error.png";

import "../blocks/page.css";

function App() {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  /*   setCurrentUser(newApi.getUserInfo()); */
  /* newApi.getUserInfo().then((res) => {
    setCurrentUser(res);
  }); */

  const [userData, setUserData] = useState({ email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /*  useEffect(() => {
    (async () => {
      await newApi.getUserInfo().then((data) => {
        setCurrentUser(data);
      });
    })();
  }, []); */

  useEffect(() => {
    if (!isLoggedIn) return;

    newApi
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error("❌ Error cargando usuario:", err);
      });
  }, [isLoggedIn]);

  /*  useEffect(() => {
    (async () => {
      await newApi.getCards().then((data) => {
        setCards(data);
      });
    })();
  }, []);
 */
  useEffect(() => {
    if (!isLoggedIn) return;

    newApi
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error("❌ Error cargando tarjetas:", err);
      });
  }, [isLoggedIn]);

  const handleUpdateUser = (data) => {
    (async () => {
      await newApi
        .patchProfile(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleUpdateAvatar = (data) => {
    /*  async () => {
      await newApi.patchProfilePicture(data);
    }; */
    (async () => {
      await newApi
        .patchProfilePicture(data)
        .then((newData) => {
          setCurrentUser({ ...currentUser, avatar: newData.avatar });
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  /*   const handleAddPlace = (data) => {
    console.log("🃏 Datos para crear tarjeta:", data);
    (async () => {
      await newApi
        .postCard(data)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          return newCard._id; esto comentarlo
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  }; */

  const handleAddPlace = (data) => {
    console.log("🃏 Datos para crear tarjeta:", data);

    newApi
      .postCard(data)
      .then((newCard) => {
        console.log("✅ Tarjeta recibida:", newCard);

        setCards((prevCards) => [newCard, ...prevCards]);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("❌ Error creando tarjeta:", error);
      });
  };
  function handleCardClick(card) {
    setPopup({ children: <ImagePopup card={card} /> });
  }

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await newApi
      .patchCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    newApi.deleteCard(card._id);
    const cardArray = cards;
    const newCardArray = cardArray.filter((c) => c._id != card._id);
    setCards(newCardArray);
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  /*   FUNCIONES DE AUTENTICACIÓN */

  const option1 = {
    link: okImage,
    text: "¡Correcto! Ya estás registrado.",
  };
  const option2 = {
    link: errorImage,
    text: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
  };
  const handleRegistration = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        const info = option1;
        setPopup({ children: <InfoTooltip info={info} /> });
        navigate("/signin");
      })
      .catch((/* console.error */ err) => {
        const info = option2;
        setPopup({ children: <InfoTooltip info={info} /> });
        if (err.status === 400) {
          console.log("uno de los campos se rellenó de forma incorrecta");
        }
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        /* console.log(data); */
        const info = option1;
        setPopup({ children: <InfoTooltip info={info} /> });
        if (data.token) {
          setToken(data.token);
          api.setToken(data.token);
          setUserData({ email }); // guardar los datos de usuario en el estado
          setIsLoggedIn(true); // inicia la sesión del usuario
          /* const redirectPath = location.state?.from?.pathname || "/my-profile"; */
          const redirectPath = "/";
          navigate(redirectPath);
        }
      })
      .catch((err) => {
        const info = option2;
        setPopup({ children: <InfoTooltip info={info} /> });
        if (err.status === 400) {
          console.log("no se ha proporcionado uno o más campos");
        } else if (err.status === 401) {
          console.log(
            "no se ha encontrado al usuario con el correo electrónico especificado"
          );
        }
      });
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    auth
      .getUserInfo(jwt)
      .then(({ email }) => {
        setIsLoggedIn(true);
        api.setToken(jwt);
        setUserData({ email });
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleCardDelete,
        handleCardLike,
        handleCardClick,
        handleAddPlace,
        cards,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        popup,
        handleClosePopup,
      }}
    >
      <div className="page">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main
                  handleOpenPopup={(popup) =>
                    handleOpenPopup(popup)
                  } /* esto se hace para evitar que se ejecute inmediatemente al renderizar, a veces esto se puede evidenciar cuando hay comportamientos extraños, como que se cierre una sesión inmediatamente */
                  handleClosePopup={() => handleClosePopup()}
                  popup={popup}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute anonymous>
                <Register
                  handleRegistration={(data) => handleRegistration(data)}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute anonymous>
                <Login handleLogin={(data) => handleLogin(data)} />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
