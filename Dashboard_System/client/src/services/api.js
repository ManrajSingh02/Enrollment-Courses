const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

const getAuthHeaders = () => {
  const token = getToken();

  if (!token) {
    throw new Error("Please login before making this request.");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const apiRequest = async (path, options = {}) => {
  const headers = {
    ...(options.auth ? getAuthHeaders() : {}),
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return parseResponse(response);
};
