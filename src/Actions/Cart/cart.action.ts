"use server";

import { authOptions } from "@/authOptions";
import { CartResponse } from "@/Interfaces/CartInterface";
import { CheckOutResponse, ShippingAddress } from "@/Interfaces/ShippingAddressInterface";
import { getServerSession } from "next-auth";


export async function getUserCartData() {
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
}


export async function addToCartAction(productId: string) {
  const session = await getServerSession(authOptions);
  const response = await fetch(process.env.API_URL + "cart", {
    method: "POST",
    headers: {
      token:
       session?.token as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  const data: CartResponse = await response.json();
  return data;
}

export async function clearCartAction() {
  const session = await getServerSession(authOptions);

  const response = await fetch(process.env.API_URL + "cart", {
    method: "DELETE",
    headers: {
      token: session?.token as string,
    },
  });
  const data: CartResponse = await response.json();
  return data;
}


export async function deleteSpecificCartItemAction(productId: string) {
  const session = await getServerSession(authOptions);

  const response = await fetch(process.env.API_URL + "cart/" + productId, {
    method: "DELETE",
    headers: {
      token: session?.token as string,
    },
  });
  const data: CartResponse = await response.json();
  return data;
};

export async function updateCartItemQuantityAction(productId: string, count: number) {
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

};



export async function checkoutSessionAction(cartId: string , shippingAddress :ShippingAddress) {
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
}
