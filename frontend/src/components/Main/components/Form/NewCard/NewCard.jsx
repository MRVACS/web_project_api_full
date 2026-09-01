import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const { currentUser, cards, handleAddPlace } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddPlace({ name: name, link: link });
  };
  return (
    <form
      className="popup__form form"
      id="form-add-card"
      name="newPlace"
      onSubmit={handleSubmit}
    >
      <div className="form__input_section">
        <input
          className="form__input-text form__name form__input"
          type="text"
          id="title"
          name="title"
          placeholder="title"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
        />
        <span className="title-input-error form__input-error"></span>
      </div>
      <div className="form__input_section">
        <input
          className="form__input-text form__url form__input"
          id="URL"
          type="url"
          name="URL"
          placeholder="Image URL"
          required
          onChange={handleLinkChange}
        />
        <span className="URL-input-error form__input-error"></span>
      </div>
      <button
        type="submit"
        className="form__button"
        id="add-card-button"
        /* disabled */
      >
        Save
      </button>
    </form>
  );
}
