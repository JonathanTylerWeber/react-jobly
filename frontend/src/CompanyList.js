import React from "react";
import { Link } from "react-router-dom";
import CompanyCard from "./CompanyCard";

function CompanyList({ data }) {
  return (
    <section >
      <h1>Companies</h1>
      <ul>
        {data.map(c => (
          <Link to={`/companies/${c.handle}`} exact="true" >
            <CompanyCard key={c.handle} company={c} />
          </Link>
        ))}
      </ul>

    </section >
  )
}

export default CompanyList;