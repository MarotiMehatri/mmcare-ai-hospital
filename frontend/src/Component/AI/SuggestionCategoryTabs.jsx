import React from "react";

function SuggestionCategoryTabs({ categories, activeCategory, onChange }) {
  return (
    <div className="ai-category-tabs">
      {categories.map((category) => (
        <button
          key={category}
          className={`ai-category-tab ${
            activeCategory === category ? "active-tab" : ""
          }`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default SuggestionCategoryTabs;
