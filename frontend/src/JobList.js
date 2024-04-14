import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard"; // Import the JobCard component

function JobList() {
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getJobs() {
      try {
        let jobs = await JoblyApi.getJobs();
        setJobs(jobs);
      } catch (error) {
        setError(error.message || "An error occurred");
      }
    }
    getJobs();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!jobs) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Jobs</h1>
      <ul>
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </ul>
    </div>
  );
}

export default JobList;
