import "./Header.css";
import logoWhite from "../../assets/headerLogo.svg";
import logoBlack from "../../assets/headerLogoBlack.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ isLoggedIn, userName, onSignOut, onSignInClick }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  return (
    <header className={`header ${isSavedNewsPage ? "header_theme_black" : ""}`}>
      <Link to="/">
        <img
          className="header__logo"
          src={isSavedNewsPage ? logoBlack : logoWhite}
          alt="Logo"
        />
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignOut={onSignOut}
        onSignInClick={onSignInClick}
        isSavedNewsPage={isSavedNewsPage}
      />
    </header>
  );
}

export default Header;
