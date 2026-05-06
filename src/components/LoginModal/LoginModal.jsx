import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onSubmit, onOpenRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    if (validateForm()) {
      onSubmit({ email, password });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: "" });
    if (submitError) setSubmitError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors({ ...errors, password: "" });
    if (submitError) setSubmitError("");
  };

  const isButtonDisabled = !email.trim() || !password;

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setErrors({});
    setSubmitError("");
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleClose}
      title="Sign In"
      buttonText="Sign In"
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
      alternativeText="or"
      alternativeButtonText="Sign up"
      onAlternativeClick={onOpenRegister}
      error={submitError}
    >
      <div className="modal__field">
        <label className="modal__label" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          className={`modal__input ${errors.email ? "modal__input-error" : ""}`}
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <p className="modal__field-error">{errors.email}</p>}
      </div>
      <div className="modal__field">
        <label className="modal__label" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          className={`modal__input ${errors.password ? "modal__input-error" : ""}`}
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && (
          <p className="modal__field-error">{errors.password}</p>
        )}
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
