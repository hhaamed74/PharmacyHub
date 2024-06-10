import React from "react";
import CategoryView from "../CategoryView/CategoryView";
import MedicineView from "./MedicineView";

// Medicine Component: Renders the CategoryView for Medicine category
export const Medicine = () => {
  return (
    <CategoryView
      categoryId={1}
      categoryName="Medicine"
      ViewComponent={MedicineView}
    />
  );
};

export default Medicine;
