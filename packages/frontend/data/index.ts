export interface Sales {
  name: string;
  total: number;
  percentage: number;
  increase: boolean;
  color: string;
}

export const sales: Sales[] = [
  {
    name: "Menu Sales",
    total: 1256,
    percentage: 6,
    increase: true,
    color: "bg-blue-500",
  },
  {
    name: "Online Orders",
    total: 1256,
    percentage: 13,
    increase: false,
    color: "bg-orange-500",
  },
  {
    name: "In-store Orders",
    total: 1256,
    percentage: 12,
    increase: true,
    color: "bg-red-500",
  },
];
