import React from "react";

import CategoryView from "../CategoryView/CategoryView";
import EquipmentsView from "./EquipmentsView";

// Equipments Component: Renders the Equipments category using CategoryView
const Equipments = () => {
  return (
    <CategoryView
      categoryId={3} // ID for the Equipments category
      categoryName="Equipments" // Name of the Equipments category
      ViewComponent={EquipmentsView} // Specific view component for Equipments
    />
  );
};

export default Equipments;
