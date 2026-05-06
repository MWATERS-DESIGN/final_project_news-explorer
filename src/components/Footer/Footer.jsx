import "./Footer.css";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__page-section">
        <p className="footer__copyright">
          &copy; 2026 Supersite, Powered by News API
        </p>
        <div className="footer__links">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            TripleTen
          </a>
          <div className="footer__social-icons">
            <a
              href="https://github.com/MWATERS-DESIGN"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <img src={github} alt="GitHub" className="footer__social-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/marquis-waters"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <img
                src={linkedin}
                alt="LinkedIn"
                className="footer__social-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
