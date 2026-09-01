import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";
export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext); // Obtiene el objeto currentUser
  const [name, setName] = useState(currentUser.name); // Agrega la variable de estado para name
  const [description, setDescription] = useState(currentUser.about); // Agrega la variable de estado para description

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Actualiza description cuando cambie la entrada
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios
    handleUpdateUser({ name: name, about: description }); // Actualiza la información del usuario
  };
  return (
    <form
      className="popup__form form"
      name="editarPerfil"
      onSubmit={handleSubmit}
    >
      <div className="form__input_section">
        <input
          className="form__input-text form__name form__input"
          type="text"
          id="name"
          name="name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="name-input-error form__input-error"></span>
      </div>
      <div className="form__input_section">
        <input
          className="form__input-text form__about form__input"
          type="text"
          id="about"
          name="about"
          placeholder="Acerca de mí"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="about-input-error form__input-error"></span>
      </div>
      <button
        type="submit"
        className="form__button save-profile-button"
        /* disabled */
      >
        Save
      </button>
    </form>
  );
}
