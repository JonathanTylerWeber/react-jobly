import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoblyApi from './api.js'
import './App.css';
import CompanyList from './CompanyList.js'
import Home from "./Home";

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

  console.log(companies)

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact path="/companies"
              element={<CompanyList data={companies} />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div >
  );
}

export default App;
