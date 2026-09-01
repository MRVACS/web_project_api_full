import "../blocks/infoTooltip.css";

export default function InfoTooltip(props) {
  const { link, text } = props.info;
  return (
    <>
      <div className="infoTooltip">
        {/* <div className="popup__expandedImage expandedImage"> */}
        <img src={link} className="infoTooltip__image" alt="imagenAviso" />
        <p className="infoTooltip__message">{text}</p>
      </div>
      {/* <div> */}
      {/* <p className="expandedImage__name">{name}</p> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
