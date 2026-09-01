import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({ avatar: avatarRef.current.value });
    /*     console.log(avatarRef); */
  }
  return (
    <form
      className="popup__form form"
      id="form-profile-picture"
      name="newAvatar"
      onSubmit={handleSubmit}
    >
      <div className="form__input_section">
        <input
          className="form__input-text form__url form__input"
          ref={avatarRef}
          id="pictureURL"
          type="url"
          name="URL"
          placeholder="Image URL"
          required
        />
        <span className="URL-input-error form__input-error"></span>
      </div>
      <button
        type="submit"
        className="form__button save-pofilePic-button"
        id="edit-profile-picture-button"
        /* disabled */
      >
        Save
      </button>
    </form>
  );
}
