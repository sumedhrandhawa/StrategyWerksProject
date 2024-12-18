import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import ProductModal from "./ProductModal";
import Filters from "./Filters";
import SortByDropdown from "./SortByDropDown";
import ClipLoader from "react-spinners/ClipLoader";

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
  const [sortType, setSortType] = useState("");
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
      filtering(filters.title, filters.minPrice, filters.maxPrice, [
        ...allData,
        ...response.data,
      ]);
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
  };

  const openModal = (product) => {
    setModalProduct(product);
  };

  const closeModal = () => {
    setModalProduct(null);
  };

  const onSortChange = (value) => {
    setSortType(value);
    sorting(value, products);
  };

  const sorting = (sortBy, data) => {
    const sort = sortBy || sortType;
    setProducts(() => {
      const sortedProducts = [...data]; // Creating a new array so that I avoid mutating states
      if (sort === "priceHighToLow") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sort === "priceLowToHigh") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "alphabeticalAZ") {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === "alphabeticalZA") {
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
      }
      return sortedProducts;
    });
  };

  const isSortRequired = (data) => {
    if (sortType) {
      sorting(sortType, data);
    } else {
      setProducts(data);
    }
  };

  const shouldFilter = () => {
    return (
      filters.title !== "" ||
      filters.minPrice !== 0 ||
      filters.maxPrice !== Number.MAX_SAFE_INTEGER
    );
  };

  const filtering = (clear, min, max, updatedData) => {
    let { title, minPrice, maxPrice } = filters;

    if (updatedData?.length > 0) {
      title = clear || "";
      minPrice = min || 0;
      maxPrice = max || Number.MAX_SAFE_INTEGER;
    }

    const data = updatedData || allData;
    const final = shouldFilter()
      ? data.filter(
          (each) =>
            each.price >= Number(min === 0 ? 0 : minPrice || 0) &&
            each.price <= Number(max || maxPrice || Number.MAX_SAFE_INTEGER) &&
            ((clear && !updatedData) ||
              title.trim() === "" ||
              each.title.toLowerCase().includes(title.toLowerCase()))
        )
      : data;
    isSortRequired(final);
  };

  return (
    <>
      {loading && (
        <div className="loader-div">
          <ClipLoader
            color={"#4a90e2"}
            loading={loading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Filters
        setFilters={setFilters}
        filtering={filtering}
        clearFilter={clearFilter}
        setClearFilter={setClearFilter}
        setSortType={setSortType}
      />
      <SortByDropdown
        onSortChange={onSortChange}
        sortType={sortType}
        setSortType={setSortType}
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
        {hasMore && !loading && (
          <button className="dropdown-button" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center" }}>Error: {error}</p>}
    </>
  );
};

export default ProductList;
