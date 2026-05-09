import { useEffect, useCallback } from "react";
import "./ModalWithForm.css";
import close from "../../assets/whiteclose.svg";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onSubmit,
  isButtonDisabled,
  alternativeText,
  alternativeButtonText,
  onAlternativeClick,
  error,
}) {
  // Handle ESC key press
  const handleEscKey = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  // Handle click outside modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscKey]);

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={close} alt="Close" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
          {error && <p className="modal__error">{error}</p>}
          <button
            type="submit"
            className="modal__submit-button"
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
          {alternativeText && onAlternativeClick && (
            <p className="modal__alternative">
              {alternativeText}{" "}
              <button
                type="button"
                className="modal__alternative-button"
                onClick={onAlternativeClick}
              >
                {alternativeButtonText || onAlternativeClick}
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
