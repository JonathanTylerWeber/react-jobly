import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Home";
import Navbar from './Navbar.js'
import CompanyList from './CompanyList.js'
import Company from './CompanyDetails.js'
import JobList from "./JobList.js";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";
import LoginForm from "./Login";
import SignupForm from "./Signup";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (error) {
          console.error("Failed to fetch user information:", error);
        }
      }
    };

    fetchUserInfo();
  }, [token]);

  const handleLogin = async (username, password) => {
    try {
      let token = await JoblyApi.login(username, password);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Login failed:", errors);
      return { success: false, errors };
    }
  };

  const handleSignup = async (userData) => {
    try {
      const token = await JoblyApi.signup(userData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Signup failed:", errors);
      return { success: false, errors };
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
  };


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar currentUser={currentUser} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route
              exact path="/"
              element={<Home />} />
            <Route
              exact path="/companies"
              element={<CompanyList />}
            />
            <Route
              exact path="/companies/:handle"
              element={<Company />}
            />
            <Route
              exact path="/jobs"
              element={<JobList />}
            />
            <Route
              exact path="/login"
              element={<LoginForm handleLogin={handleLogin} />} />
            <Route
              exact path="/signup"
              element={<SignupForm handleSignup={handleSignup} />} />
            {/* <Route
              exact path="/profile"
              element={<Profile currentUser={currentUser} />} /> */}
          </Routes>
        </main>
      </BrowserRouter>
    </div >
  );
}

export default App;
