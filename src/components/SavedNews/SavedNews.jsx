import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedNews({
  savedArticles,
  onUnsaveArticle,
  isArticleSaved,
  userName,
}) {
  // Get unique keywords from saved articles
  const getKeywords = () => {
    if (savedArticles.length === 0) return "none";
    const keywords = savedArticles
      .slice(0, 2)
      .map((a) => a.source?.name || "News");
    const remaining = savedArticles.length - 2;
    if (remaining > 0) {
      return `${keywords.join(", ")}, and ${remaining} other${remaining > 1 ? "s" : ""}`;
    }
    return keywords.join(", ");
  };

  return (
    <div className="saved-news">
      {/* Header section with white background */}
      <div className="saved-news__header">
        <h2 className="saved-news__title">Saved articles</h2>
        {savedArticles.length > 0 ? (
          <>
            <p className="saved-news__description">
              {userName}, you have {savedArticles.length} saved <br /> article
              {savedArticles.length !== 1 ? "s" : ""}
            </p>
            <p className="saved-news__keywords">
              By keywords:{" "}
              <span className="saved-news__keywords-value">
                {getKeywords()}
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="saved-news__description">
              You haven't saved any articles yet.
            </p>
            <p className="saved-news__keywords">
              Search for news and click the save icon to save articles here.
            </p>
          </>
        )}
      </div>

      {/* Cards section with gray background */}
      {savedArticles.length > 0 && (
        <div className="saved-news__cards-section">
          <div className="saved-news__cards">
            {savedArticles.map((article) => {
              // Get the article URL - could be stored as 'url' or 'link'
              const articleUrl = article.url || article.link;
              return (
                <NewsCard
                  key={articleUrl}
                  article={article}
                  isSaved={isArticleSaved(articleUrl)}
                  onUnsave={onUnsaveArticle}
                  onDelete={onUnsaveArticle}
                  showKeyword={true}
                  variant="saved"
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedNews;
