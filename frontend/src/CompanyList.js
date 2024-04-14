import React from "react";
// import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";

function CompanyList({ data }) {
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Companies
          </CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <ListGroup>
            {data.map(d => (
              // <Link to={`/${itemType}/${item.id}`} key={item.id}>
              <ListGroupItem>{d.name}</ListGroupItem>
              // </Link>
            ))}
          </ListGroup>
          {/* <Link to={`/add-${itemEndpoint}`}>
            <p className="link font-weight-bold text-center">Add {itemType}</p>
          </Link> */}
          {/* <Link to={'/'} >
            <p className="link text-center">Home Page</p>
          </Link> */}
        </CardBody>
      </Card>
    </section>
  )
}

export default CompanyList;