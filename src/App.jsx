import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyResetCode from "./pages/VerifyResetCode";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import Onboarding from "./pages/Onboarding";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import QuizPage from "./pages/QuizPage";
import QuizStart from "./pages/QuizStart";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <div className="app-shell">
      <AuthProvider>
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-reset" element={<VerifyResetCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Courses />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/1"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CourseDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <Layout>
                    <QuizPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/start"
              element={
                <ProtectedRoute>
                  <Layout>
                    <QuizStart />
                  </Layout>
                </ProtectedRoute>
              }
            />
            {/* Add a catch-all route for 404 pages */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </AuthProvider>
      <ToastContainer position="top-right" />
    </div>
  );
}
