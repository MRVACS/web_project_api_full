export default function Popup(props) {
  const { onClose, title, children } = props;
  return (
    <div className="popup">
      <button
        className="popup__close-button popup__close-profile-form-button"
        onClick={onClose}
      >
        X
      </button>
      <div className="popup__content">
        {title && <h2 className="form__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
