import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";

function CompanyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    async function fetchFilteredCompanies() {
      try {
        const companies = await getFilteredCompanies(searchTerm);
        setFilteredCompanies(companies);
      } catch (error) {
        console.error("Error fetching filtered companies:", error);
      }
    }

    fetchFilteredCompanies();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting search form...");
    try {
      const companies = await getFilteredCompanies(searchTerm);
      console.log("Filtered companies:", companies);
      setFilteredCompanies(companies);
    } catch (error) {
      console.error("Error fetching filtered companies:", error);
    }
  };

  const getFilteredCompanies = async (searchTerm) => {
    const companies = await JoblyApi.getCompanies(searchTerm);
    return companies;
  };

  return (
    <section>
      <h1>Companies</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search companies"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {filteredCompanies.map(c => (
          <Link to={`/companies/${c.handle}`} key={c.handle}>
            <CompanyCard company={c} />
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default CompanyList;