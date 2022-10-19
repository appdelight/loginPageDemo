import React from "react";
import "./App.css";
// import {LoginPage} from "./pages/LoginPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

class App extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-center ">
        
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
