const API_KEY = "bf3c6d5daa384880a6a0608162263ef3";
const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2"
    : "https://newsapi.org/v2";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// Get date string in YYYY-MM-DD format
const getDateString = (date) => {
  return date.toISOString().split("T")[0];
};

export const searchNews = (query) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const from = getDateString(sevenDaysAgo);
  const to = getDateString(today);

  const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&from=${from}&to=${to}&pageSize=100&apiKey=${API_KEY}`;

  return fetch(url).then(handleServerResponse);
};
