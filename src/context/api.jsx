import axios from "axios";

const BASE_URL = "https://dev-api.sydaar.com/api/v1";

// Public API instance (no auth header)
const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Authenticated API instance (with auth header)
const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth interceptor only to authenticated API
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("sydaar_access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Common response interceptor for both
const setupResponseInterceptor = (instance) => {
  instance.interceptors.response.use(
    (response) => {
      console.log("✅ API Response Success:", {
        url: response.config.url,
        status: response.status,
      });
      return response;
    },
    (error) => {
      console.error("❌ API Response Error:", {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      if (error.response?.status === 401) {
        localStorage.removeItem("sydaar_access_token");
        localStorage.removeItem("sydaar_user");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
};

setupResponseInterceptor(publicApi);
setupResponseInterceptor(authApi);

export const authAPI = {
  register: async (userData) => {
    const response = await publicApi.post("/auth/register", userData);
    return response.data;
  },

  login: async (credentials) => {
     const formData = new FormData();
     formData.append("username", credentials.email);
     formData.append("password", credentials.password);

     console.log(
       "🔐 Login payload (FormData):",
       Object.fromEntries(formData.entries())
     );

    const response = await publicApi.post("/auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await authApi.get("/auth/profile");
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("sydaar_access_token");
    localStorage.removeItem("sydaar_user");
  },
};

export const organisationAPI = {
  getOrganisations: async () => {
    const response = await publicApi.get("/organisation/list");
    return response.data;
  },
};

export default { authAPI, organisationAPI };
