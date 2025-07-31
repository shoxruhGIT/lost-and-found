"use client";

import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
import BoardPage from "../pages/board-page";
import { Toaster } from "sonner";
import PublicRoute from "../routes/publicRoute";
import ProtectedRoute from "../routes/protectedRoute";

const App = () => {
  return (
    <main className="w-full h-screen flex">
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
};

export default App;
