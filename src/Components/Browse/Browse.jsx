import React from "react";
import { Container, Row } from "react-bootstrap";

const Cares = () => {
  const caresStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#27b43e",
    backgroundColor: "#e5e0e021",
    padding: "10px 20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "fit-content",
  };

  return (
    <Container>
      <Row>
        <div>
          <h2 style={caresStyle}>Category</h2>
        </div>
      </Row>
    </Container>
  );
};

export default Cares;
