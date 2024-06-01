// struct MenuItem {
//     uint256 id;
//     string name;
//     string description;
//     uint256 price;
//     Category itemCategory;
//     uint256 stockCount;
// }

// struct Sale {
//   string name;
//   SalesType salesType;
//   uint256 amount;
//   uint256 increase;
// }

export enum SalesType {
  Menu,
  InStore,
  Online,
}

export enum Category {
  Burgers,
  Desserts,
  Drinks,
}

export type MenuT = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  itemCategory: Category;
  stockCount: number;
};

export type SalesT = {
  name: string;
  salesType: SalesType;
  amount: number;
  increase: number;
};

// types.ts
export interface ProductFormData {
  image: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  category: number;
}
