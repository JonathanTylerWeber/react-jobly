import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoblyApi from './api.js'
import './App.css';
import Home from "./Home";
import Navbar from './Navbar.js'
import CompanyList from './CompanyList.js'
import Company from './CompanyDetails.js'
import JobList from "./JobList.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getInfo() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getInfo();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact path="/companies"
              element={<CompanyList data={companies} />}
            />
            <Route
              exact path="/companies/:handle"
              element={<Company />}
            />
            <Route
              exact path="/jobs"
              element={<JobList />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div >
  );
}

export default App;
