import { useState } from "react";
import "./Navigation.css";
import { NavLink, useLocation } from "react-router-dom";
import signoutBlack from "../../assets/signoutBlack.svg";
import signoutWhite from "../../assets/signoutWhite.svg";

function Navigation({
  isLoggedIn,
  userName,
  onSignOut,
  onSignInClick,
  isSavedNewsPage,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignInClick = () => {
    setIsMobileMenuOpen(false);
    onSignInClick();
  };

  // Close menu when route changes
  if (location.pathname !== location.pathname) {
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="navigation">
        <div className="navigation__container">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Home
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
            >
              Saved Articles
            </NavLink>
          )}

          {isLoggedIn ? (
            <button
              className="navigation__sign-out-btn"
              onClick={onSignOut}
              aria-label="Sign out"
              title="Sign out"
            >
              <span className="navigation__username">{userName}</span>
              <img
                src={isSavedNewsPage ? signoutBlack : signoutWhite}
                alt="Sign out"
                className="navigation__sign-out-icon"
              />
            </button>
          ) : (
            <button className="navigation__sign-in-btn" onClick={onSignInClick}>
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`navigation__mobile-overlay ${isMobileMenuOpen ? "navigation__mobile-overlay_open" : ""}`}
      >
        <div className="navigation__mobile-content">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__mobile-link ${isActive ? "navigation__mobile-link_active" : ""}`
            }
            onClick={toggleMobileMenu}
          >
            Home
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `navigation__mobile-link ${isActive ? "navigation__mobile-link_active" : ""}`
              }
              onClick={toggleMobileMenu}
            >
              Saved Articles
            </NavLink>
          )}

          {isLoggedIn ? (
            <button
              className="navigation__mobile-sign-out-btn"
              onClick={onSignOut}
              aria-label="Sign out"
            >
              <span>{userName}</span>
              <img src={signoutWhite} alt="Sign out" />
            </button>
          ) : (
            <button
              className="navigation__mobile-sign-in-btn"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="navigation__mobile-toggle"
        onClick={toggleMobileMenu}
        aria-label="Menu"
      >
        <span
          className={`navigation__mobile-toggle-icon ${isMobileMenuOpen ? "navigation__mobile-toggle-icon_open" : ""}`}
        ></span>
      </button>
    </>
  );
}

export default Navigation;
