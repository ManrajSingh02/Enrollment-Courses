const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5004/api";

export const getStoredToken = () => {
  const token = localStorage.getItem("token");

  return token && token !== "null" && token !== "undefined" ? token : null;
};

const friendlyMessages = {
  "User not found": "We could not find an account with that email.",
  "Invalid password": "The email or password is incorrect.",
};

export const getFriendlyErrorMessage = (message) =>
  friendlyMessages[message] ||
  message ||
  "Something went wrong. Please try again.";

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(getFriendlyErrorMessage(data.message));
  }

  return data;
};

export const apiRequest = async (path, options = {}) => {
  const { auth, body, headers: customHeaders, ...fetchOptions } = options;
  const headers = {
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...customHeaders,
  };

  if (auth) {
    const token = getStoredToken();

    if (!token) {
      throw new Error("Please sign in again to continue.");
    }

    headers.authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...fetchOptions,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return parseResponse(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "We are having trouble connecting right now. Please try again in a moment.",
        { cause: error },
      );
    }

    throw error;
  }
};
