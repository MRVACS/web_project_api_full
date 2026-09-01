import { useState, useEffect, useContext } from "react";
/* import React from "react"; */
import profileImage from "../../assets/images/Avatar.png";
import bigPencil from "../../assets/images/PicturePencil.png";
import littlePencil from "../../assets/images/lápiz.png";
import Popup from "../Main/components/Popup/Popup";
import NewCard from "../Main/components/Form/NewCard/NewCard";
import EditProfile from "../Main/components/Form/EditProfile/EditProfile";
import EditAvatar from "../Main/components/Form/EditAvatar/EditAvatar";
import Card from "../Main/components/Card/Card.jsx";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Main(props) {
  const newCardPopup = { title: "New Place", children: <NewCard /> };
  const editProfilePopup = { title: "Edit Profile", children: <EditProfile /> };
  const editAvatarPopup = { title: "Edit Avatar", children: <EditAvatar /> };

  const { popup, handleClosePopup, handleOpenPopup } = props;

  const {
    currentUser,
    handleCardDelete,
    handleCardLike,
    handleCardClick,
    cards,
  } = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__picture">
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="señor viejito con gorro"
          />
          <div className="profile__avatar-edit">
            <img
              src={bigPencil}
              className="profile__avatar-edit-picture"
              alt="lápiz de edición"
              onClick={() => handleOpenPopup(editAvatarPopup)}
            />
          </div>
        </div>
        <div className="profile__info">
          <p className="profile__name">{currentUser.name}</p>
          <button
            className="profile__edit-button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          >
            <img
              src={littlePencil}
              className="profile__edit-image"
              alt="lápiz de edición"
            />
          </button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          +
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            handleCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
          />
        ))}
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
