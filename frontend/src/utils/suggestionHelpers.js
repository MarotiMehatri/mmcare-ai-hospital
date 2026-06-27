export const formatDateTime = (dateString) => {
  if (!dateString) return "Not available";
  const date = new Date(dateString);
  return date.toLocaleString();
};

export const getPriorityClass = (priority = "") => {
  const value = priority.toLowerCase();

  if (value === "high") return "priority-high";
  if (value === "medium") return "priority-medium";
  if (value === "low") return "priority-low";
  return "priority-default";
};

export const filterSuggestionsByCategory = (
  suggestions = [],
  category = "All",
) => {
  if (category === "All") return suggestions;
  return suggestions.filter(
    (item) => item.category?.toLowerCase() === category.toLowerCase(),
  );
};

export const getSuggestionCategories = (suggestions = []) => {
  const categories = suggestions.map((item) => item.category).filter(Boolean);

  return ["All", ...new Set(categories)];
};
