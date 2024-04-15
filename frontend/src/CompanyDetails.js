import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";

function CompanyDetails({ currentUser, setCurrentUser }) {
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);
  const { handle } = useParams();

  useEffect(() => {
    async function getCompanyData() {
      try {
        let companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
      } catch (error) {
        setError(error.message || "An error occurred");
      }
    }
    getCompanyData();
  }, [handle]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!company) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{company.name}</h1>
      <p>Description: {company.description}</p>
      <ul>
        {company.jobs.map(job => (
          <JobCard key={job.id} job={job} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        ))};
      </ul>
    </div>
  );
}

export default CompanyDetails;