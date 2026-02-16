"use server";
import { authOptions } from "@/authOptions";
import { wishListResponse } from "@/Interfaces/wishListInterface";
import { getServerSession } from "next-auth";

export async function getUserWishlistData() {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(process.env.API_URL + "wishlist", {
      headers: {
        token: session?.token || "",
      },
    });
    const data: wishListResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function addToWishlistAction(productId: string) {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(process.env.API_URL + "wishlist", {
      method: "POST",
      headers: {
        token: session?.token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
      const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function deleteSpecificWishlistItemAction(productId: string) {
  try {
    const session = await getServerSession(authOptions);

    const response = await fetch(process.env.API_URL + "wishlist/" + productId, {
      method: "DELETE",
      headers: {
        token: session?.token as string,
      },
    });
    const data: wishListResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}