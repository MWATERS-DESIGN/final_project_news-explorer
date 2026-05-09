import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import NewsCardsSection from "../NewsCardsSection/NewsCardsSection";
import SavedNews from "../SavedNews/SavedNews";
import About from "../About/About";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { searchNews } from "../../utils/api";
import { authorize, checkToken, register } from "../../utils/auth";
import { getItems, saveArticle, deleteArticle } from "../../utils/backendApi";

function App() {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [savedArticles, setSavedArticles] = useState(() => {
    // Initialize from localStorage on mount
    const stored = localStorage.getItem("savedArticles");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (err) {
        console.error("Failed to parse saved articles from localStorage:", err);
      }
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Modal states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const stored = localStorage.getItem("isLoggedIn");
    return stored === "true";
  });
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  // Load saved articles from backend when logged in
  useEffect(() => {
    if (isLoggedIn) {
      getItems()
        .then((items) => {
          setSavedArticles(items);
        })
        .catch((err) => {
          console.error("Failed to load saved articles:", err);
        });
    }
  }, [isLoggedIn]);

  // Save articles to localStorage whenever they change (fallback)
  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  // Save auth state to localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    if (isLoggedIn) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
    }
  }, [isLoggedIn, userName, token]);

  // Check token on mount to restore session
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      checkToken(storedToken)
        .then((response) => {
          setIsLoggedIn(true);
          setUserName(response.data.name || response.data.email.split("@")[0]);
          setToken(storedToken);
        })
        .catch(() => {
          // Invalid token, clear it
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userName");
        });
    }
  }, []);

  // Check if an article is saved
  const isArticleSaved = useCallback(
    (articleUrl) => {
      return savedArticles.some(
        (saved) => saved.link === articleUrl || saved.url === articleUrl,
      );
    },
    [savedArticles],
  );

  // Handle saving an article
  const handleSaveArticle = useCallback(
    (article) => {
      if (!isArticleSaved(article.url)) {
        if (isLoggedIn) {
          // Use backend API when logged in
          setIsLoading(true);
          saveArticle(article)
            .then((savedArticle) => {
              setSavedArticles((prev) => [...prev, savedArticle]);
            })
            .catch((err) => {
              console.error("Failed to save article:", err);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          // Fallback to localStorage when not logged in
          setSavedArticles((prev) => [...prev, article]);
        }
      }
    },
    [isArticleSaved, isLoggedIn],
  );

  // Handle unsaving an article
  const handleUnsaveArticle = useCallback(
    (article) => {
      // Get the article URL - could be stored as 'url' or 'link'
      const articleUrl = article.url || article.link;

      if (isLoggedIn) {
        // Find the article by URL and delete it from backend
        const articleToDelete = savedArticles.find((saved) => {
          const savedUrl = saved.link || saved.url;
          return savedUrl === articleUrl;
        });
        if (articleToDelete && articleToDelete._id) {
          setIsLoading(true);
          deleteArticle(articleToDelete._id)
            .then(() => {
              setSavedArticles((prev) =>
                prev.filter((saved) => {
                  const savedUrl = saved.link || saved.url;
                  return savedUrl !== articleUrl;
                }),
              );
            })
            .catch((err) => {
              console.error("Failed to delete article:", err);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          // Fallback if no _id found
          setSavedArticles((prev) =>
            prev.filter((saved) => {
              const savedUrl = saved.link || saved.url;
              return savedUrl !== articleUrl;
            }),
          );
        }
      } else {
        // Fallback to localStorage when not logged in
        setSavedArticles((prev) =>
          prev.filter((saved) => {
            const savedUrl = saved.link || saved.url;
            return savedUrl !== articleUrl;
          }),
        );
      }
    },
    [isLoggedIn, savedArticles],
  );

  // Handle search
  const handleSearch = (query) => {
    // Validate input
    if (!query || query.trim() === "") {
      setSearchError("Please enter a keyword");
      return;
    }

    setSearchError("");
    setIsSearchLoading(true);
    setHasSearched(true);

    searchNews(query.trim())
      .then((data) => {
        if (data.status === "ok") {
          setArticles(data.articles || []);
          setSearchError("");
        } else {
          setArticles([]);
          setSearchError("error");
        }
      })
      .catch(() => {
        setArticles([]);
        setSearchError("error");
      })
      .finally(() => {
        setIsSearchLoading(false);
      });
  };

  // Auth handlers
  const handleLogin = (data) => {
    setIsLoading(true);
    authorize(data.email, data.password)
      .then((response) => {
        setToken(response.token);
        // Get user info from token
        return checkToken(response.token);
      })
      .then((userResponse) => {
        setUserName(userResponse.data.name || data.email.split("@")[0]);
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert("Login failed. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = (data, setEmailNotAvailable) => {
    setIsLoading(true);
    register(data.email, data.password, data.username)
      .then((response) => {
        setToken(response.token);
        setUserName(data.username || data.email.split("@")[0]);
        setIsLoggedIn(true);
        setIsRegisterModalOpen(false);
        setIsSuccessModalOpen(true);
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        if (err.type === "email_exists") {
          // Set email not available error in the modal
          if (setEmailNotAvailable) {
            setEmailNotAvailable(true);
          }
        } else {
          alert("Registration failed. Please try again.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserName("");
    setToken("");
    // Clear saved articles when signing out
    setSavedArticles([]);
  };

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const goToSignInFromSuccess = () => {
    setIsSuccessModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const isHome = location.pathname === "/";

  return (
    <div
      className={`page ${location.pathname === "/saved-news" ? "page_saved-news" : ""}`}
    >
      <div className="page__content">
        {isHome ? (
          <section className="page__hero">
            <Header
              isLoggedIn={isLoggedIn}
              userName={userName}
              onSignOut={handleSignOut}
              onSignInClick={openLoginModal}
            />

            <Main
              onSearch={handleSearch}
              isLoading={isSearchLoading}
              validationError={
                searchError === "Please enter a keyword" ? searchError : ""
              }
            />
          </section>
        ) : (
          <Header
            isLoggedIn={isLoggedIn}
            userName={userName}
            onSignOut={handleSignOut}
            onSignInClick={openLoginModal}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <NewsCardsSection
                  articles={articles}
                  title="Search results"
                  isLoading={isSearchLoading}
                  error={searchError === "error"}
                  hasSearched={hasSearched}
                  onSaveArticle={handleSaveArticle}
                  onUnsaveArticle={handleUnsaveArticle}
                  isArticleSaved={isArticleSaved}
                  isLoggedIn={isLoggedIn}
                />
                <About />
              </>
            }
          />

          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews
                  savedArticles={savedArticles}
                  onUnsaveArticle={handleUnsaveArticle}
                  isArticleSaved={isArticleSaved}
                  userName={userName}
                  isLoading={isLoading}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSubmit={handleLogin}
        onOpenRegister={openRegisterModal}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onSubmit={handleRegister}
        onOpenLogin={openLoginModal}
      />
      <RegistrationSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        onSignInClick={goToSignInFromSuccess}
      />
    </div>
  );
}

export default App;
