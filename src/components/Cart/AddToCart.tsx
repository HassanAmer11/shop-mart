"use client";
import React, { useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, Loader, ShoppingCartIcon } from "lucide-react";
import toast from "react-hot-toast";
import { addToCartAction } from "@/Actions/Cart/cart.action";
import { addToWishlistAction } from "@/Actions/Wishlist/wishlist.action";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  async function addToCart() {
    setIsLoading(true);
    try {
      const data = await addToCartAction(productId);
      if (data.status == "success") {
        toast.success(data.message);
        dispatchEvent(
          new CustomEvent("cartUpdated", { detail: data.numOfCartItems }),
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function addToWishlist() {
    setIsWishlistLoading(true);
    try {
      const data = await addToWishlistAction(productId);
      if (data.status == "success") {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsWishlistLoading(false);
  }

  return (
    <>
      <CardFooter className="gap-2">
        <Button disabled={isLoading} className="grow" onClick={addToCart}>
          {isLoading ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            <ShoppingCartIcon className="size-5" />
          )}
          Add To Card
        </Button>
        {isWishlistLoading ? (
          <Loader className="size-5 animate-spin" />
        ) : (
          <Heart className="size-6 cursor-pointer" onClick={addToWishlist} />
        )}
      </CardFooter>
    </>
  );
}
