import "../../../../blocks/confirmationPopup.css";
export default function ConfirmationPopup({ cardInfo, onClose }) {
  return (
    <>
      <div className="confirmationPopup">
        <div className="confirmationPopup__header">
          <h1 className="confirmationPopup__title">
            ¿Estás seguro de eliminar?
          </h1>
        </div>
        <div className="confirmationPopup__buttons">
          <button
            className="confirmationPopup__button"
            onClick={() => handleCardDelete(cardInfo)}
          >
            Confirmar
          </button>
          <button
            className="confirmationPopup__button"
            onClick={() => onClose()}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
