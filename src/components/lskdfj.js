import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import ProductModal from "./ProductModal";
import Filters from "./Filters";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [allData, setAllData] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    minPrice: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
  });
  const [hasMore, setHasMore] = useState(false);
  const LIMIT = 10; // Number of items to fetch per request

  // Fetch products whenever `page` or `filters` changes
  useEffect(() => {
    fetchProducts();
  }, [page, filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { title, minPrice, maxPrice } = filters;
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?title=${title}&offset=${
          (page - 1) * LIMIT
        }&limit=${LIMIT}&price_min=${minPrice}&price_max=${maxPrice}`
      );

      // Append new products without replacing the old ones
      setProducts((prev) => [...prev, ...response.data]);
      setAllData((prev) => [...prev, ...response.data]);
      setHasMore(response.data.length === LIMIT); // Check if more data is available
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1); // Increment page to fetch the next set of products
    }
  };

  const openModal = (product) => {
    setModalProduct(product);
  };

  const closeModal = () => {
    setModalProduct(null);
  };

  const filtering = () => {
    const { minPrice, maxPrice } = filters;
    setProducts(
      allData.filter(
        (each) =>
          each.price >= (minPrice || 0) &&
          each.price <= (maxPrice || Number.MAX_SAFE_INTEGER)
      )
    );
  };

  const clearFilter = (title, min, max) => {
    // Clear input fields by targeting their refs
    title.current.value = "";
    min.current.value = "";
    max.current.value = "";
    setFilters({
      title: "",
      minPrice: 0,
      maxPrice: Number.MAX_SAFE_INTEGER,
    });
    filtering();
  };

  return (
    <>
      <Filters
        setFilters={setFilters}
        filtering={filtering}
        clearFilter={clearFilter}
      />
      <div className="product-list">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            openModal={openModal}
          />
        ))}
        {modalProduct && (
          <ProductModal product={modalProduct} onClose={closeModal} />
        )}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
      <div className="product-list-button">
        {hasMore && !loading && <button onClick={loadMore}>Load More</button>}
      </div>
    </>
  );
};

export default ProductList;