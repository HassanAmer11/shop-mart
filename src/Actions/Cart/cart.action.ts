"use server";

import { authOptions } from "@/authOptions";
import { CartResponse } from "@/Interfaces/CartInterface";
import { CheckOutResponse, ShippingAddress } from "@/Interfaces/ShippingAddressInterface";
import { getServerSession } from "next-auth";


export async function getUserCartData() {
  try {
    const session = await getServerSession(authOptions);
    console.log("token", session?.token);
    const response = await fetch(process.env.API_URL + "cart", {
      headers: {
        token: session?.token || "",
        "Content-Type": "application/json",
      },
    });
    const data: CartResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function addToCartAction(productId: string) {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(process.env.API_URL + "cart", {
      method: "POST",
      headers: {
        token: session?.token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    const data: CartResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function clearCartAction() {
  try {
    const session = await getServerSession(authOptions);

    const response = await fetch(process.env.API_URL + "cart", {
      method: "DELETE",
      headers: {
        token: session?.token as string,
      },
    });
    const data: CartResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function deleteSpecificCartItemAction(productId: string) {
  try {
    const session = await getServerSession(authOptions);

    const response = await fetch(process.env.API_URL + "cart/" + productId, {
      method: "DELETE",
      headers: {
        token: session?.token as string,
      },
    });
    const data: CartResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function updateCartItemQuantityAction(
  productId: string,
  count: number,
) {
  try {
    const session = await getServerSession(authOptions);

    const response = await fetch(process.env.API_URL + "cart/" + productId, {
      method: "PUT",
      headers: {
        token: session?.token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    });
    const data: CartResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function checkoutSessionAction(
  cartId: string,
  shippingAddress: ShippingAddress,
) {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(
      process.env.API_URL +
        `orders/checkout-session/${cartId}?url=${process.env.BASE_URL}`,
      {
        method: "POST",
        headers: {
          token: session?.token as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress }),
      },
    );
    const data: CheckOutResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error during checkout session creation:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
