import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import SelectionView from "./components/SelectionView";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/select" element={<SelectionView />} />
      </Routes>
    </Router>
  );
};

export default App;
