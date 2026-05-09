import { useEffect, useCallback } from "react";
import "./RegistrationSuccessModal.css";
import close from "../../assets/whiteclose.svg";

function RegistrationSuccessModal({ isOpen, onClose, onSignInClick }) {
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
    <div className="success-modal" onClick={handleOverlayClick}>
      <div className="success-modal__container">
        <button
          type="button"
          className="success-modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={close} alt="Close" />
        </button>
        <h2 className="success-modal__title">
          Registration successfully <br /> completed!
        </h2>
        <button
          type="button"
          className="success-modal__signin-button"
          onClick={onSignInClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccessModal;
