import React, { useState } from "react";

const SortByDropdown = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    // onSortChange(value); // Pass the selected value to the parent or handler
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
            checked={selectedOption === "priceHighToLow"}
            onChange={handleSortChange}
          />
          Price High to Low
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="priceLowToHigh"
            checked={selectedOption === "priceLowToHigh"}
            onChange={handleSortChange}
          />
          Price Low to High
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="alphabeticalAZ"
            checked={selectedOption === "alphabeticalAZ"}
            onChange={handleSortChange}
          />
          Alphabetically A-Z
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="alphabeticalZA"
            checked={selectedOption === "alphabeticalZA"}
            onChange={handleSortChange}
          />
          Alphabetically Z-A
        </label>
      </div>
    </div>
  );
};

export default SortByDropdown;
