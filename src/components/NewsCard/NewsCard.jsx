import "./NewsCard.css";
import trashIcon from "../../assets/trash.svg";
import saveIcon from "../../assets/savebutton.svg";
import activeSaveIcon from "../../assets/activesavebutton.svg";

function NewsCard({
  article,
  isSaved,
  onSave,
  onUnsave,
  onDelete,
  isLoggedIn,
  showKeyword = false, // Show keyword badge only on saved news page
  variant = "default", // "default" or "saved"
}) {
  const { title, description, urlToImage, publishedAt, source } = article;

  // Format the date
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    if (isNaN(Date.parse(date))) return "Date not available";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle save/unsave click
  const handleSaveClick = () => {
    if (!isLoggedIn) {
      return;
    }
    if (isSaved) {
      if (onUnsave) onUnsave(article);
    } else {
      if (onSave) onSave(article);
    }
  };

  // Handle delete click (for SavedNews page)
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(article);
  };

  // Get keyword from source name
  const keyword = source?.name || "News";

  // Unified card layout for both default and saved variants
  return (
    <article
      className={`news-card ${variant === "saved" ? "news-card_saved" : ""}`}
    >
      {/* TOP SECTION: Image area with keyword (top-left) and save/delete (top-right) */}
      <div className="news-card__image-wrapper">
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            className="news-card__image"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x200?text=No+Image";
            }}
          />
        ) : (
          <img
            src="https://via.placeholder.com/400x200?text=No+Image"
            alt="No image available"
            className="news-card__image"
          />
        )}
        {/* Keyword in TOP LEFT corner - only show on saved news page */}
        {showKeyword && (
          <span className="news-card__keyword-badge">{keyword}</span>
        )}
        {/* Save or Delete button in TOP RIGHT corner */}
        {onDelete ? (
          <div className="news-card__delete-wrapper">
            <button
              type="button"
              className="news-card__delete-button"
              onClick={handleDeleteClick}
              aria-label="Delete article from saved"
            >
              <img
                src={trashIcon}
                alt="Delete"
                className="news-card__delete-icon"
              />
            </button>
            <div className="news-card__tooltip">Remove from saved</div>
          </div>
        ) : (
          <div className="news-card__save-wrapper">
            <button
              type="button"
              className="news-card__save-button"
              onClick={handleSaveClick}
              aria-label={isSaved ? "Remove from saved" : "Save article"}
            >
              <img
                src={isSaved ? activeSaveIcon : saveIcon}
                alt={isSaved ? "Remove from saved" : "Save article"}
                className="news-card__save-icon"
              />
            </button>
            {!isLoggedIn && (
              <div className="news-card__tooltip">Sign in to save articles</div>
            )}
          </div>
        )}
      </div>

      {/* MIDDLE SECTION: Date, Title, Description */}
      <div className="news-card__content">
        <span className="news-card__date">{formatDate(publishedAt)}</span>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">
          {description
            ? description.substring(0, 200) + "..."
            : "No description available"}
        </p>
      </div>

      {/* BOTTOM SECTION: Source name (all caps) */}
      <div className="news-card__footer">
        <span className="news-card__source">
          {source?.name?.toUpperCase() || "NEWS"}
        </span>
      </div>
    </article>
  );
}

export default NewsCard;
