import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onSubmit, onOpenLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [emailNotAvailable, setEmailNotAvailable] = useState(false);

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

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    if (validateForm()) {
      onSubmit({ email, password, username }, setEmailNotAvailable);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: "" });
    if (submitError) setSubmitError("");
    if (emailNotAvailable) setEmailNotAvailable(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors({ ...errors, password: "" });
    if (submitError) setSubmitError("");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username) setErrors({ ...errors, username: "" });
    if (submitError) setSubmitError("");
  };

  const isButtonDisabled = !email.trim() || !password || !username.trim();

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setErrors({});
    setSubmitError("");
    setEmailNotAvailable(false);
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleClose}
      title="Sign Up"
      buttonText="Sign Up"
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
      alternativeText="or"
      alternativeButtonText="Sign In"
      onAlternativeClick={onOpenLogin}
      error={submitError}
    >
      <div className="modal__field">
        <label className="modal__label" htmlFor="register-email">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          className={`modal__input ${errors.email ? "modal__input-error" : ""}`}
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <p className="modal__field-error">{errors.email}</p>}
      </div>
      <div className="modal__field">
        <label className="modal__label" htmlFor="register-password">
          Password
        </label>
        <input
          id="register-password"
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
      <div className="modal__field">
        <label className="modal__label" htmlFor="register-username">
          Username
        </label>
        <input
          id="register-username"
          type="text"
          className={`modal__input ${errors.username ? "modal__input-error" : ""}`}
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
        />
        {errors.username && (
          <p className="modal__field-error">{errors.username}</p>
        )}
      </div>
      {emailNotAvailable && (
        <p className="modal__error">This email is not available</p>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
