import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmailPage from "./pages/EmailPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/404Page";
import RestrictedUser from "./components/RestrictedUser";
import RestrictedGuest from "./components/RestrictedGuest";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RestrictedGuest>
              <LoginPage />
            </RestrictedGuest>
          }
        />
        <Route
          path="/email"
          element={
            <RestrictedUser>
              <EmailPage />
            </RestrictedUser>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
