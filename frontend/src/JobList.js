import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";

function JobList({ currentUser, setCurrentUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    async function fetchFilteredJobs() {
      try {
        const jobs = await getFilteredJobs(searchTerm);
        setFilteredJobs(jobs);
      } catch (error) {
        console.error("Error fetching filtered jobs:", error);
      }
    }

    fetchFilteredJobs();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting search form...");
    try {
      const jobs = await getFilteredJobs(searchTerm);
      console.log("Filtered jobs:", jobs);
      setFilteredJobs(jobs);
    } catch (error) {
      console.error("Error fetching filtered jobs:", error);
    }
  };

  const getFilteredJobs = async (searchTerm) => {
    const jobs = await JoblyApi.getJobs(searchTerm);
    return jobs;
  };

  return (
    <div>
      <h1>Jobs</h1>
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
        {filteredJobs.map(job => (
          <JobCard key={job.id} job={job} currentUser={currentUser}
            setCurrentUser={setCurrentUser} />
        ))}
      </ul>
    </div>
  );
}

export default JobList;
