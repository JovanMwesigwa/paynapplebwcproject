export interface Sales {
  name: string;
  total: number;
  percentage: number;
  increase: boolean;
  color: string;
}

export interface MenuCategory {
  emoji: string;
  title: string;
  numOfItems: number;
  active: boolean;
}

export const sales: Sales[] = [
  {
    name: "Menu",
    total: 1256,
    percentage: 6,
    increase: true,
    color: "bg-blue-500",
  },
  {
    name: "Online",
    total: 1256,
    percentage: 13,
    increase: false,
    color: "bg-orange-500",
  },
  {
    name: "In-Store",
    total: 1256,
    percentage: 12,
    increase: true,
    color: "bg-red-500",
  },
];

export const menuCategories: MenuCategory[] = [
  {
    emoji: "🍽️",
    title: "All",
    numOfItems: 3,
    active: true,
  },
  {
    emoji: "🍔",
    title: "Burgers",
    numOfItems: 5,
    active: false,
  },
  {
    emoji: "🍦",
    title: "Desserts",
    numOfItems: 2,
    active: false,
  },
  {
    emoji: "🍹",
    title: "Drinks",
    numOfItems: 4,
    active: false,
  },
];
