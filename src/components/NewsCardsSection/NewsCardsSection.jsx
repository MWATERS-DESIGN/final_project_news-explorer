import { useState } from "react";
import "./NewsCardsSection.css";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";

function NewsCardsSection({
  articles,
  title,
  isLoading,
  error,
  hasSearched,
  onSaveArticle,
  onUnsaveArticle,
  isArticleSaved,
  isLoggedIn,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const hasMoreArticles = articles.length > visibleCount;
  const displayedArticles = articles.slice(0, visibleCount);

  // Don't render anything if no search has been made and not loading
  if (!hasSearched && !isLoading && articles.length === 0) {
    return null;
  }

  return (
    <section className="news-cards-section">
      <div className="news-cards-section__container">
        {isLoading && <Preloader />}

        {!isLoading && title && articles.length > 0 && (
          <h2 className="news-cards-section__title">{title}</h2>
        )}

        {!isLoading && !error && articles.length > 0 && (
          <>
            <div className="news-cards-section__grid">
              {displayedArticles.map((article) => (
                <NewsCard
                  key={article.url}
                  article={article}
                  isSaved={isArticleSaved(article.url)}
                  onSave={onSaveArticle}
                  onUnsave={onUnsaveArticle}
                  isLoggedIn={isLoggedIn}
                />
              ))}
            </div>
            {hasMoreArticles && (
              <button
                className="news-cards-section__show-more"
                onClick={handleShowMore}
              >
                Show more
              </button>
            )}
          </>
        )}

        {!isLoading && !error && articles.length === 0 && hasSearched && (
          <div className="news-cards-section__no-results">
            <h3 className="news-cards-section__no-results-title">
              Nothing found
            </h3>
            <p className="news-cards-section__no-results-text">
              Sorry, but nothing matched your search terms.
            </p>
          </div>
        )}

        {error && (
          <p className="news-cards-section__error">
            Sorry, something went wrong during the request. Please try again
            later.
          </p>
        )}
      </div>
    </section>
  );
}

export default NewsCardsSection;
