import React, { useState } from "react";

interface CategorySelectorProps {
  onSelect: (category: { id: number; name: string; icon: string }) => void;
}

const categoryData = [
  {
    id: 2,
    name: "Drinks",
    icon: "🍹",
  },
  {
    id: 0,
    name: "Burgers",
    icon: "🍔",
  },
  {
    id: 1,
    name: "Desserts",
    icon: "🍰",
  },
];

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(
    categoryData[0].id
  );

  const handleCategorySelect = (category: {
    id: number;
    name: string;
    icon: string;
  }) => {
    setSelectedCategory(category.id);
    onSelect(category);
  };

  return (
    <div className="w-full max-w-md py-2 rounded-sm overflow-hidden">
      <div className="flex justify-between rounded-sm overflow-hidden">
        {categoryData.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2  text-sm font-medium focus:outline-none w-full ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
