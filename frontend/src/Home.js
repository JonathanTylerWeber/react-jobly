import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function Home() {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Jobly
            </h3>
          </CardTitle>
          <CardText>
            we have jobs
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;