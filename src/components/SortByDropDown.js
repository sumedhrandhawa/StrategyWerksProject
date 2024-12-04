import React, { useState } from "react";

const SortByDropdown = ({ onSortChange, sortType, setSortType }) => {

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortType(value);
    onSortChange(value); // Pass the selected value to the parent or handler
  };

  return (
    <div className="sort-dropdown">
      <button className="dropdown-button">Sort By</button>
      <div className="dropdown-content">
        <label>
          <input
            type="radio"
            name="sort"
            value="priceHighToLow"
            checked={sortType === "priceHighToLow"}
            onChange={handleSortChange}
          />
          Price High to Low
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="priceLowToHigh"
            checked={sortType === "priceLowToHigh"}
            onChange={handleSortChange}
          />
          Price Low to High
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="alphabeticalAZ"
            checked={sortType === "alphabeticalAZ"}
            onChange={handleSortChange}
          />
          Alphabetically A-Z
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="alphabeticalZA"
            checked={sortType === "alphabeticalZA"}
            onChange={handleSortChange}
          />
          Alphabetically Z-A
        </label>
      </div>
    </div>
  );
};

export default SortByDropdown;
