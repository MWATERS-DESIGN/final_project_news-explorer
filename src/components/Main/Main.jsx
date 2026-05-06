import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";

function Main({ onSearch, validationError }) {
  return (
    <div className="main">
      <h1 className="main__title">
        <span className="main__title-line1">What's going on in</span>
        <span className="main__title-line2">the world?</span>
      </h1>
      <p className="main__description">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm onSearch={onSearch} validationError={validationError} />
    </div>
  );
}

export default Main;
