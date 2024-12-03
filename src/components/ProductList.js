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
  const [callApi, setCallApi] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);
  const LIMIT = 10; // Number of items to fetch per request

  useEffect(() => {
    fetchProducts();
    setHasMore(true);
  }, [callApi]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?offset=${
          (page - 1) * LIMIT
        }&limit=${LIMIT}`
      );
      setProducts((prev) => [...prev, ...response.data]);
      setAllData((prev) => [...prev, ...response.data]); // Append to existing data
      setHasMore(!(response.data.length < LIMIT));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
    setCallApi(!callApi);
    setFilters({
      title: "",
      minPrice: 0,
      maxPrice: Number.MAX_SAFE_INTEGER,
    });
    setClearFilter(!clearFilter);
    filtering("clear", 0, Number.MAX_SAFE_INTEGER);
  };

  const openModal = (product) => {
    setModalProduct(product);
  };

  const closeModal = () => {
    setModalProduct(null);
  };

  const filtering = (clear, min, max) => {
    const { title, minPrice, maxPrice } = filters;
    let data = allData;
    let final = data.filter(
      (each) =>
        each.price >= Number(min === 0 ? 0 : minPrice || 0) &&
        each.price <= Number(max || maxPrice || Number.MAX_SAFE_INTEGER) &&
        (clear ||
          title.trim() === "" ||
          each.title.toLowerCase().includes(title.toLowerCase()))
    );
    setProducts(final);
  };

  return (
    <>
      <Filters
        setFilters={setFilters}
        filtering={filtering}
        clearFilter={clearFilter}
        setClearFilter={setClearFilter}
      />
      <div className="product-list">
        {products?.map((product, i) => (
          <ProductItem key={i} product={product} openModal={openModal} />
        ))}
        {modalProduct && (
          <ProductModal product={modalProduct} onClose={closeModal} />
        )}
      </div>
      <div className="product-list-button">
        {hasMore && !loading && <button onClick={loadMore}>Load More</button>}
      </div>
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center" }}>Error: {error}</p>}
    </>
  );
};

export default ProductList;
