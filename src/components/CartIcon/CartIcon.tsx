"use client";
import { getUserCartData } from "@/Actions/Cart/cart.action";
import { LoaderCircleIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const [cartNums, setCartNums] = useState<number | string>("");
  const [isLoading, setIsLoading] = useState(false);
  async function countCartItems() {
    setIsLoading(true);
    const cartData = await getUserCartData();
    setCartNums(cartData.numOfCartItems);
    setIsLoading(false);
  }

  useEffect(() => {
    countCartItems();
    //countCartItems().then((num) => setCartNums(num));
    addEventListener("cartUpdated", function (e: CustomEvent) {
      console.log(e.detail);
      setCartNums(e.detail);
    } as EventListener);
  }, []);

  return (
    <>
      <Link href="/carts" className="relative">
        <ShoppingCartIcon className="size-6" />
        <span className="text-sm bg-black text-white px-1 rounded-full absolute -top-2 -right-2">
          {isLoading ? (
            <LoaderCircleIcon className=" animate-spin size-4" />
          ) : (
            cartNums
          )}
        </span>
      </Link>
    </>
  );
}
