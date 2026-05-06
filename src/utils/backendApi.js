/**
 * simulates backend responses for saved articles
 * Replace these stub functions with real fetch requests when backend is ready
 */

// Store for simulating saved articles in "database"
let savedArticles = [];

// Counter for generating unique IDs
let idCounter = 1;

// Generates a fake MongoDB-style ID

const generateId = () => {
  // Use a simple counter-based approach for predictable testing
  const currentId = idCounter;
  idCounter++;
  const counter = currentId.toString(16).padStart(8, "0");
  const baseId = "65f73" + counter + "7bce9e7d331b11a0";
  return baseId.padEnd(24, "0").slice(0, 24);
};

// returns a promise that resolves to an array of saved article data
// Simulates fetching saved articles from the database

export function getItems() {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Return a copy of the saved articles to prevent direct mutation
      resolve([...savedArticles]);
    }, 300);
  });
}

// Saves an article to the simulated database
// Article object from NewsAPI
// Article title
// Article URL
// - Article image URL
// - Article description
// - Article publication date
// - Article source name
// Resolves with the saved article including _id

export function saveArticle(article) {
  return new Promise((resolve, reject) => {
    // Validate required fields
    if (!article || !article.url) {
      return reject(new Error("Article must have a URL"));
    }

    // Check if article already exists
    const exists = savedArticles.some((a) => a.url === article.url);
    if (exists) {
      return reject(new Error("Article already saved"));
    }

    // Simulate network delay
    setTimeout(() => {
      // Create the saved article object with database fields
      const savedArticle = {
        _id: generateId(),
        keyword: article.keyword || "",
        title: article.title || "",
        text: article.description || "",
        date: article.publishedAt || new Date().toISOString(),
        source: article.source?.name || article.source || "",
        link: article.url,
        image: article.urlToImage || article.imageUrl || "",
      };

      // Add to our simulated database
      savedArticles.push(savedArticle);

      // Resolve with the saved article
      resolve(savedArticle);
    }, 300);
  });
}

// Deletes an article from the simulated database
// The MongoDB _id of the article to delete
// Resolves with the deleted article

export function deleteArticle(articleId) {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Find the article index
      const index = savedArticles.findIndex((a) => a._id === articleId);

      if (index === -1) {
        return reject(new Error("Article not found"));
      }

      // Remove from our simulated database
      const deleted = savedArticles.splice(index, 1)[0];

      // Resolve with the deleted article
      resolve(deleted);
    }, 300);
  });
}

/**
 * Clears all saved articles (useful for testing)
 */
export function clearAllArticles() {
  savedArticles = [];
  idCounter = 1;
}

// Adds articles to the simulated database (useful for testing)

export function addTestArticles(articles) {
  articles.forEach((article) => {
    if (!savedArticles.some((a) => a.url === article.url)) {
      savedArticles.push({
        _id: article._id || generateId(),
        keyword: article.keyword || "",
        title: article.title || "",
        text: article.description || article.text || "",
        date: article.publishedAt || article.date || new Date().toISOString(),
        source: article.source?.name || article.source || "",
        link: article.url || article.link || "",
        image: article.urlToImage || article.image || "",
      });
    }
  });
}
