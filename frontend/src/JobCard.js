import React from "react";

function JobCard({ job }) {
  return (
    <li key={job.id}>
      <h3>{job.title}</h3>
      <h4>{job.companyName}</h4>
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
    </li>
  );
}

export default JobCard;
