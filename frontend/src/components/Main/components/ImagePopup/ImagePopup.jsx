export default function ImagePopup(props) {
  const { name, link } = props.card;
  return (
    <>
      <div className="popup__expanded">
        <div className="popup__expandedImage expandedImage">
          <img src={link} className="popup__image" alt={name} />
        </div>
        <div>
          <p className="expandedImage__name">{name}</p>
        </div>
      </div>
    </>
  );
}
