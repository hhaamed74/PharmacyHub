import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Row } from "react-bootstrap";
import "../../css/Cares.css";

const CategoryView = ({ categoryId, categoryName, ViewComponent }) => {
  useEffect(() => {
    // Fetch data whenever the categoryId changes
    fetchDataHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // State to store the products fetched from the API
  const [products, setProducts] = useState([]);

  // Function to fetch data from the API
  async function fetchDataHandler() {
    try {
      // API call to fetch products by category ID
      const response = await fetch(
        `https://e-pharmacyhub-edarcdhhakcaeaad.eastus-01.azurewebsites.net/api/product?CategoryId=${categoryId}`
      );
      const Product = await response.json();

      // Mapping the fetched data to a structured format
      const ProductData = Product.data.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          pictureUrl: product.pictureUrl,
          category: product.category,
          pharmacies: product.pharmacies,
          quantity: product.quantity,
        };
      });

      // Update the state with the new product data
      setProducts(ProductData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  return (
    <Fragment>
      {/* Search component can be included here if needed */}
      {/* <Search id="custom-search" /> */}
      <div className="container">
        <Row id="Cares">
          {/* Display the category name */}
          <h2>{categoryName}</h2>
        </Row>
      </div>
      {/* Pass the fetched products to the ViewComponent for rendering */}
      <ViewComponent myProduct={products} />
    </Fragment>
  );
};

export default CategoryView;
