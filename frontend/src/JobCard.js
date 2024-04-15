import React, { useState, useEffect } from "react";
import JoblyApi from "./api";

function JobCard({ job, currentUser, setCurrentUser }) {
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (currentUser && currentUser.applications) {
        const appliedJobIds = currentUser.applications.map(id => Number(id));
        setHasApplied(appliedJobIds.includes(Number(job.id)));
      }
    };

    checkApplicationStatus();
  }, [currentUser, job]);

  const handleApply = async () => {
    try {
      await JoblyApi.applyForJob(currentUser.username, job.id);
      const updatedUser = await JoblyApi.getCurrentUser(currentUser.username);
      setCurrentUser(updatedUser);
      setHasApplied(true);
      alert("You have successfully applied for this job!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("An error occurred while applying for this job. Please try again later.");
    }
  };

  return (
    <li key={job.id}>
      <h3>{job.title}</h3>
      <h4>{job.companyName}</h4>
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
      {currentUser && (
        <button onClick={handleApply} disabled={hasApplied}>
          {hasApplied ? "Applied" : "Apply"}
        </button>
      )}
    </li>
  );
}

export default JobCard;
