"use server";

import { ProductResponse } from "@/Interfaces/ProductInterface";

export default async function getProductsAction(
  page: number,
): Promise<ProductResponse | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL}products?page=${page}&limit=12`,
    );
    const result: ProductResponse = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}
