import React from "react";
const Filter = ({ categories, onCategoryChange, onEngagementRangeChange }) => {
  return (
    <div className="filters">
      <label>Category</label>
      <select onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label>Engagement Score Range</label>
      <select onChange={(e) => onEngagementRangeChange(e.target.value)}>
        <option value="">All</option>
        <option value="0-1000">0-1000</option>
        <option value="1000-5000">1000-5000</option>
        <option value="5000+">5000+</option>
      </select>
    </div>
  );
};

export default Filter;
