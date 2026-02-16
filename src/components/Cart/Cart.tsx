"use client";
import { CartResponse } from "@/Interfaces/CartInterface";
import Image from "next/image";
import { useState } from "react";
import {
  clearCartAction,
  deleteSpecificCartItemAction,
  updateCartItemQuantityAction,
} from "@/Actions/Cart/cart.action";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import CheckOut from "../CheckOut/CheckOut";
import { formatCurrency } from "@/Helpers/formatCurrency";

export default function Cart({ cartData }: { cartData: CartResponse }) {
  const [cartItems, setCartItems] = useState<CartResponse | null>(cartData);
  const [isLoadingId, setIsLoadingId] = useState<string | null>(null);
  async function clearCart() {
    const res = await clearCartAction();
    if (res.message === "success") {
      setCartItems(null);
      dispatchEvent(new CustomEvent("cartUpdated", { detail: 0 }));
    }
  }

  async function deleteSpecificItemById(productId: string) {
    setIsLoadingId(productId);
    const res = await deleteSpecificCartItemAction(productId);
    if (res.status === "success") {
      setCartItems(res);
      toast.success("Item Deleted From Cart");
      dispatchEvent(
        new CustomEvent("cartUpdated", { detail: res.numOfCartItems }),
      );
    }
  }

  async function updateCartItemQuantity(productId: string, count: number) {
    setIsLoadingId(productId);
    const res = await updateCartItemQuantityAction(productId, count);
    if (res.status === "success") {
      toast.success("Cart Updated Successfully");
      setCartItems(res);
    }
    setIsLoadingId(null);
  }
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
      {cartItems && cartItems.numOfCartItems > 0 ? (
        <>
          <p className="text-muted-foreground mt-1">
            {cartItems.numOfCartItems} items in your cart
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.data.products.map((item) => (
                <div
                  className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card relative"
                  key={item._id}
                >
                  {isLoadingId === item.product._id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                      <Loader2 className="animate-spin" />
                    </div>
                  )}
                  <Image
                    alt={item.product.title}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                    src={item.product.imageCover}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.product.category.name} -{" "}
                          {item.product.brand.name}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-semibold">{formatCurrency(item.price)}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={item.count <= 1}
                          onClick={() =>
                            updateCartItemQuantity(
                              item.product.id,
                              item.count - 1,
                            )
                          }
                          aria-label="decrease"
                          className="size-8 rounded-lg border hover:bg-accent cursor-pointer"
                        >
                          –
                        </button>
                        <span className="w-6 text-center font-medium">
                          {item.count}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItemQuantity(
                              item.product.id,
                              item.count + 1,
                            )
                          }
                          aria-label="increase"
                          className="size-8 rounded-lg border hover:bg-accent"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => deleteSpecificItemById(item.product._id)}
                        aria-label="remove"
                        className="text-destructive hover:underline text-sm  cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1 sticky top-18">
              <div className="rounded-xl border p-5 shadow-sm ">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Subtotal (1 items)
                    </span>
                    <span className="font-semibold">
                       {formatCurrency(cartItems.data.totalCartPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Shipping
                    </span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                </div>
                <div className="my-4 border-t" />
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-base font-bold">
                    {cartItems.data.totalCartPrice}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <Link href="/products">
                    <button className="w-full  cursor-pointer mt-3 h-11 rounded-xl border hover:bg-accent">
                      Continue Shopping
                    </button>
                  </Link>

                  <CheckOut cartId={cartItems.cartId} />
                </div>
              </div>
              <button
                onClick={() => {
                  clearCart();
                }}
                data-slot="button"
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 mt-2 ms-auto text-destructive hover:text-destructive cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash2 lucide-trash-2"
                  aria-hidden="true"
                >
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                clear cart
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-[60vh] flex flex-col gap-4 items-center justify-center">
          <h2 className="text-2xl font-semibold">Your Cart Is Empty</h2>
          <button
            data-slot="button"
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
          >
            <Link href={"/products"}>Add ones</Link>
          </button>
        </div>
      )}
    </div>
  );
}
