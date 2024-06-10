import React from "react";

import CategoryView from "../CategoryView/CategoryView";
import CaresView from "./CaresView";

// Cares component definition
export const Cares = () => {
  return (
    // CategoryView is a component that takes in a category ID, name, and a view component to render
    <CategoryView
      categoryId={4} // The ID for the "Cares" category
      categoryName="Cares" // The name for the "Cares" category
      ViewComponent={CaresView} // The component that will render the details for this category
    />
  );
};

// Exporting the Cares component as the default export
export default Cares;
