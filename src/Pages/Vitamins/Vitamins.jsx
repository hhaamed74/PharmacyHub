import React from "react";

// Importing components
import CategoryView from "../CategoryView/CategoryView";
import VitaminsView from "./VitaminsView";

// Component for rendering Vitamins category
export const Vitamins = () => {
  // Rendering CategoryView component with specific props
  return (
    <CategoryView
      categoryId={2} // Setting categoryId prop
      categoryName="Vitamins" // Setting categoryName prop
      ViewComponent={VitaminsView} // Setting ViewComponent prop to VitaminsView
    />
  );
};

export default Vitamins;
