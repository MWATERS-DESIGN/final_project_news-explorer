# News Explorer

A modern, responsive news aggregation web application built with React and Vite. Search, discover, and save news articles from various sources using the NewsAPI.

![React](https://img.shields.io/badge/React-19.2.5-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.10-646cff?logo=vite)
![React Router](https://img.shields.io/badge/React_Router-7.14.2-ca4245?logo=react-router)

## 🌐 Live Demo

[https://MWATERS-DESIGN.github.io/final_project_news-explorer/](https://MWATERS-DESIGN.github.io/final_project_news-explorer/)

## ✨ Features

- **News Search**: Search for news articles from the past 7 days using keywords
- **Save Articles**: Bookmark articles for later reading (requires authentication)
- **User Authentication**: Register and login to sync saved articles across devices
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Articles are fetched live from NewsAPI
- **Protected Routes**: Secure access to saved news section

## 🛠️ Tech Stack

- **Frontend**: React 19.2.5
- **Build Tool**: Vite 8.0.10
- **Routing**: React Router DOM 7.14.2
- **Linting**: ESLint 10.2.1
- **API**: NewsAPI (newsapi.org)

## 📁 Project Structure

```
final_project_news-article/
├── public/
│   └── NewsIcon.svg
├── src/
│   ├── assets/              # Images and SVG icons
│   ├── components/
│   │   ├── About/           # About section component
│   │   ├── App/             # Main application component
│   │   ├── Footer/          # Footer component
│   │   ├── Header/          # Header with navigation
│   │   ├── LoginModal/      # Login modal
│   │   ├── Main/            # Main search section
│   │   ├── ModalWithForm/   # Reusable modal with form
│   │   ├── Navigation/      # Navigation component
│   │   ├── NewsCard/        # Individual news card
│   │   ├── NewsCardsSection/# Grid of news cards
│   │   ├── Preloader/       # Loading spinner
│   │   ├── ProtectedRoute/  # Route protection wrapper
│   │   ├── RegisterModal/   # Registration modal
│   │   ├── RegistrationSuccessModal/ # Success feedback
│   │   ├── SavedNews/       # Saved articles page
│   │   └── SearchForm/      # Search input form
│   ├── utils/
│   │   ├── api.js           # NewsAPI integration
│   │   ├── auth.js          # Authentication API
│   │   ├── backendApi.js    # Saved articles API (simulated)
│   │   └── constants.js     # Application constants
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MWATERS-DESIGN/final_project_news-explorer.git
   cd final_project_news-article
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deployment

This project is configured for deployment to GitHub Pages:

```bash
npm run deploy
```

## 📱 Usage

### Searching for News

1. Enter a keyword or phrase in the search bar on the homepage
2. Press Enter or click the search button
3. Browse through the search results (articles from the past 7 days)

### Saving Articles

1. **Without account**: Articles are saved locally in your browser
2. **With account**: Articles are synced to the backend and accessible from any device
   - Click the "Sign In" button to log in
   - Click "Register" to create a new account
   - Once logged in, your saved articles will be available in the "Saved News" section

### Managing Saved Articles

- View all saved articles by navigating to the "Saved News" page
- Remove articles by clicking the trash icon
- Articles are stored both locally and on the backend (when authenticated)

## 🔌 API Integration

### NewsAPI

The application uses the [NewsAPI](https://newsapi.org/) to fetch news articles.

- **Endpoint**: `https://newsapi.org/v2/everything`
- **Parameters**: Search query, date range (past 7 days), page size (100 articles)
- **API Key**: Configured in `src/utils/api.js`

### Backend API (Simulated)

The `backendApi.js` module simulates backend operations for saving articles:

- `getItems()` - Fetch all saved articles
- `saveArticle(article)` - Save a new article
- `deleteArticle(articleId)` - Remove an article

> **Note**: Replace the simulated backend with real API calls when deploying to production.

## 🔐 Authentication

The application implements JWT-based authentication:

- User registration with email, password, and username
- Login with email and password
- Token-based session management
- Protected routes for saved news section
- Automatic token validation on app load

## 🎨 Design Features

- Clean, modern interface with custom SVG icons
- Responsive layout that adapts to all screen sizes
- Modal-based authentication forms
- Loading states and error handling
- Smooth transitions and animations

## 📄 License

This project is part of a final educational project and is not licensed for commercial use.

## 🤝 Contributing

This is an educational project. For questions or suggestions, please contact the repository owner.

## 📧 Contact

- **GitHub**: [MWATERS-DESIGN](https://github.com/MWATERS-DESIGN)
- **Repository**: [final_project_news-explorer](https://github.com/MWATERS-DESIGN/final_project_news-explorer)

---

Built with ❤️ using React and Vite
