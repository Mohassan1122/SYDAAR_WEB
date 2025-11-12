import React from "react";
import { Routes, Route, } from "react-router-dom";
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




export default function App() {

  return (
    <div className="app-shell">
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
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/courses"
            element={
              <Layout>
                <Courses />
              </Layout>
            }
          />
          <Route
            // path="/course/:id"
            path="/courses/1"
            element={
              <Layout>
                <CourseDetail />
              </Layout>
            }
          />
          <Route
            // path="/course/:id"
            path="/quiz"
            element={
              <Layout>
                <QuizPage />
              </Layout>
            }
          />
          <Route
            path="/quiz/start"
            element={
              <Layout>
                <QuizStart />
              </Layout>
            }
          />
        </Routes>
      </main>

      <ToastContainer position="top-right" />
    </div>
  );
}
