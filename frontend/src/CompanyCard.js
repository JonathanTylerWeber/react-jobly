import React from "react";

function CompanyCard({ company }) {
  return (
    <li key={company.handle}>
      <h3>{company.name}</h3>
      <p>{company.description}</p>
    </li>
  );
}

export default CompanyCard;
