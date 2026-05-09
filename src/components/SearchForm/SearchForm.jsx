import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, validationError }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Enter topic"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-form__button">
          Search
        </button>
      </div>
      {validationError && (
        <span className="search-form__error">{validationError}</span>
      )}
    </form>
  );
}

export default SearchForm;
