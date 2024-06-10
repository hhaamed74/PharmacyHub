import React, { useState } from "react";
import CaresProduct from "./CaresProduct";
import { Row, Col } from "react-bootstrap";
import Helmet from "../../Components/Helmet/Helmet";

// CaresView component definition
const CaresView = (product) => {
  const [currentPage, setCurrentPage] = useState(1); // State for current page number
  const itemsPerPage = 10; // Number of products to display per page

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the products to be displayed on the current page
  const currentProducts = product.myProduct.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Function to handle page number click
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber); // Update the current page number
  };

  // Generate product items for the current page
  const productItems = currentProducts.map((product) => {
    return (
      <CaresProduct
        key={product.id} // Use product id as the unique key
        id={product.id}
        name={product.name}
        price={product.price}
        pictureUrl={product.pictureUrl}
        category={product.category}
        pharmacies={product.pharmacies}
        quantity={product.quantity}
      />
    );
  });

  // Calculate the total number of pages needed
  const totalPages = Math.ceil(product.myProduct.length / itemsPerPage);

  // Generate pagination buttons
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button key={i} onClick={() => handlePaginationClick(i)}>
        {i}
      </button>
    );
  }

  return (
    <Helmet title="Cares">
      {" "}
      {/* Helmet component to set the page title */}
      <div>
        <div className="container">
          <Row className="content">
            <Col className="cards">{productItems}</Col>{" "}
            {/* Display the product items */}
          </Row>
          <div className="pagination">{paginationButtons}</div>{" "}
          {/* Display pagination buttons */}
        </div>
      </div>
    </Helmet>
  );
};

export default CaresView;
