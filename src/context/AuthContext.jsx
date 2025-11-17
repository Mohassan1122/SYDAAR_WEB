import React, { createContext, useState, useContext, useEffect } from "react";
import { authAPI, organisationAPI } from "./api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [organisations, setOrganisations] = useState([]);
  const [organisationsLoading, setOrganisationsLoading] = useState(false);
  const [organisationsError, setOrganisationsError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    // Clear any stale tokens on app start (optional, for debugging)
    localStorage.removeItem('sydaar_access_token');
    localStorage.removeItem('sydaar_user');

    checkAuthStatus();
    fetchOrganisations();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("sydaar_access_token");
      const savedUser = localStorage.getItem("sydaar_user");

      if (token && savedUser) {
        // Verify token is still valid by fetching profile
        const userData = JSON.parse(savedUser);
        setUser(userData);

        // Optional: Validate token with backend
        // const profile = await authAPI.getProfile();
        // setUser(profile);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganisations = async () => {
    try {
      const orgs = await organisationAPI.getOrganisations();
      setOrganisations(orgs);
    } catch (error) {
      console.error("Failed to fetch organisations:", error);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);

      // Store user data and token
      localStorage.setItem("sydaar_access_token", response.access_token);
      localStorage.setItem("sydaar_user", JSON.stringify(response));
      setUser(response);

      return { success: true, data: response };
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);

      // Store user data and token
      localStorage.setItem("sydaar_access_token", response.access_token);
      localStorage.setItem("sydaar_user", JSON.stringify(response));
      setUser(response);

      return { success: true, data: response };
    } catch (error) {
      console.error("Login failed:", error);
      let errorMessage = "Login failed";
      if (error.response?.data) {
        // If the API returns detailed error information
        const apiError = error.response.data;
        errorMessage =
          apiError.message ||
          apiError.detail ||
          Object.values(apiError).flat().join(", ") ||
          "Invalid credentials";
      } else if (error.message) {
        errorMessage = error.message;
      }
      return {
        success: false,
        error: errorMessage,
        details: error.response?.data,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    organisations,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
