/**
 * simulates backend responses
 * Replace these stub functions with real fetch requests when backend is ready
 */

// Simulates user login authentication

export const authorize = (email, password) => {
  // Validate input (basic validation)
  if (!email || !password) {
    return Promise.reject(new Error("Email and password are required"));
  }

  // Pretend we did a fetch request that gave us back a token
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      resolve({ token: "a fake token" });
    }, 500);
  });
};

// Simulates user registration
// Tracks registered emails to simulate "email not available" error
const registeredEmails = new Set();

export const register = (email, password, name) => {
  // Validate input (basic validation)
  if (!email || !password || !name) {
    return Promise.reject(new Error("All fields are required"));
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if email is already registered
      if (registeredEmails.has(email)) {
        const error = new Error("This email is not available");
        error.type = "email_exists";
        reject(error);
      } else {
        // Register the user
        registeredEmails.add(email);
        resolve({
          token: "a fake token",
          data: {
            name: name,
            email: email,
            _id: "fake-id-" + Date.now(),
          },
        });
      }
    }, 500);
  });
};

// Simulates token validation

export const checkToken = (token) => {
  // Validate token exists
  if (!token) {
    return Promise.reject(new Error("No token provided"));
  }

  // Pretend we did a fetch request that gave us back a user
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      resolve({
        data: {
          name: "fake user",
          email: "fake@example.com",
          _id: "fake-id",
        },
      });
    }, 500);
  });
};
