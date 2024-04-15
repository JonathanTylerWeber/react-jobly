import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Home";
import Navbar from './Navbar.js'
import CompanyList from './CompanyList.js'
import CompanyDetails from './CompanyDetails.js'
import JobList from "./JobList.js";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import useLocalStorage from "./useLocalStorage";
import PrivateRoute from './PrivateRoute';
import Profile from './Profile'

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useLocalStorage('token', null);

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
              exact
              path="/"
              element={<Home currentUser={currentUser} />}
            />
            <Route
              path="/companies"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <CompanyList />
                </PrivateRoute>
              }
            />
            <Route
              path="/companies/:handle"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <CompanyDetails currentUser={currentUser}
                    setCurrentUser={setCurrentUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <JobList currentUser={currentUser}
                    setCurrentUser={setCurrentUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:username"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <Profile />
                </PrivateRoute>
              }
            />
            < Route
              exact
              path="/login"
              element={<LoginForm handleLogin={handleLogin} />} />
            <Route
              exact
              path="/signup"
              element={<SignupForm handleSignup={handleSignup} />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div >
  );
}

export default App;
