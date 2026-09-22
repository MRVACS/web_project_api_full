import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { name, link, isLiked, _id, owner } = props.card;
  const { handleCardClick, handleCardLike, handleDeleteConfirmation } = props;

  const cardInfo = { name, link, isLiked, _id };
  const { currentUser } = useContext(CurrentUserContext);
  let cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_liked" : ""
  }`;

  const isOwner = currentUser._id === owner;

  return (
    <div className="element">
      {isOwner && (
        <button
          className="element__trash-can"
          /* onClick={() => handleCardDelete(cardInfo)} */
          onClick={() => handleDeleteConfirmation(cardInfo)}
        ></button>
      )}
      <img
        src={link}
        className="element__photo"
        /* onClick={props.openFunction(imagePopup)} */
        onClick={() => handleCardClick(cardInfo)}
      />
      <div className="element__banner">
        <h2 className="element__title">{name}</h2>
        <button
          className={cardLikeButtonClassName}
          onClick={() => handleCardLike(cardInfo)}
        ></button>
      </div>
    </div>
  );
}
