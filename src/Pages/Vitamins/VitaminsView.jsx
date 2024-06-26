import React, { useState } from "react";
import VitaminsProduct from "./VitaminsProduct"; // Import individual product component
import { Row, Col } from "react-bootstrap";
import Helmet from "../../Components/Helmet/Helmet";

const VitaminsView = (product) => {
  const [currentPage, setCurrentPage] = useState(1); // State for current page number
  const itemsPerPage = 12; // Number of products per page

  // Calculate index of the first and last items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the products array to get the products for the current page
  const currentProducts = product.myProduct.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Function to handle pagination
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate product items for the current page
  const productItems = currentProducts.map((product) => {
    return (
      <VitaminsProduct
        key={product.id} // Use idProduct as the unique key
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

  // Calculate total number of pages
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
      <div>
        {/* Container for product grid */}
        <div className="container">
          <Row className="content">
            <Col className="cards">{productItems}</Col> {/* Product items */}
          </Row>
          <div className="pagination">{paginationButtons}</div>{" "}
          {/* Pagination buttons */}
        </div>
      </div>
    </Helmet>
  );
};

export default VitaminsView;
