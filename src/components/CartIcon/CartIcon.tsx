"use client";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartIcon({
  countCartItems,
}: {
  countCartItems: number;
}) {
  const [cartNums, setCartNums] = useState(countCartItems);
  useEffect(() => {
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
          {cartNums}
        </span>
      </Link>
    </>
  );
}
