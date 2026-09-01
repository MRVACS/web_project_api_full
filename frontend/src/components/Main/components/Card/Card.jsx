export default function Card(props) {
  const { name, link, isLiked, _id } = props.card;
  const { handleCardClick, handleCardLike, handleCardDelete } = props;
  const cardInfo = { name, link, isLiked, _id };
  let cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_liked" : ""
  }`;

  return (
    <div className="element">
      <button
        className="element__trash-can"
        onClick={() => handleCardDelete(cardInfo)}
      ></button>
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
