import { createBrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./Home";
import Navbar from './Navbar.js'
import CompanyList from './CompanyList.js'
import Company from './CompanyDetails.js'
import JobList from "./JobList.js";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import useLocalStorage from "./useLocalStorage";
import PrivateRoute from './PrivateRoute';