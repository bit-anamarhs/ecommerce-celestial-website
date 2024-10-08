import { useState } from "react";
import Filters from "../components/Filters/Filters";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import productsData from "../data/products.json";

export default function ProductList() {
  const [products] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleFilterChange = (filters) => {
    const filtered = products.filter((product) => {
      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.includes(product.category);

      const colorMatch =
        filters.color.length === 0 ||
        filters.color.some((c) =>
          product.color.toLowerCase().includes(c.toLowerCase())
        );

      return categoryMatch && colorMatch ; // Updated to include websiteType
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="container-fluid mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Available Templates</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <Filters onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full md:w-3/4">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
