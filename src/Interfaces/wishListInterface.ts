import { Brand } from "./BrandInterface";
import { Category, Subcategory } from "./ProductInterface";

export interface wishListResponse {
  status: string;
  count: number;
  data: wishItem[];
}

export interface wishItem {
  sold?: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  priceAfterDiscount?: number;
}


