import React, { useEffect, useRef } from "react";

const Filters = ({
  setFilters,
  filtering,
  clearFilter,
  setClearFilter,
  setSortType,
}) => {
  const titleRef = useRef(null);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    titleRef.current.value = "";
    minPriceRef.current.value = "";
    maxPriceRef.current.value = "";
    setFilters({
      title: "",
      minPrice: 0,
      maxPrice: Number.MAX_SAFE_INTEGER,
    });
    setSortType("");
  }, [clearFilter]);

  return (
    <div className="filter">
      <div className="filters">
        <input
          type="text"
          name="title"
          placeholder="Search title"
          ref={titleRef}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          ref={minPriceRef}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          ref={maxPriceRef}
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="filter_button" onClick={() => filtering()}>
          Filter
        </button>
        <button
          className="filter_button"
          onClick={() => {
            setClearFilter(!clearFilter);
            filtering(true, 0, Number.MAX_SAFE_INTEGER);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filters;
