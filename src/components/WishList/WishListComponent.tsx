"use client";
import { deleteSpecificWishlistItemAction } from "@/Actions/Wishlist/wishlist.action";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { wishListResponse } from "@/Interfaces/wishListInterface";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function WishListComponent({
  wishList,
}: {
  wishList: wishListResponse;
}) {
  const [wishListItems, setWishListItems] = useState<wishListResponse | null>(
    wishList,
  );
  const [isLoadingId, setIsLoadingId] = useState<string | null>(null);

  async function deleteSpecificItemById(productId: string) {
    setIsLoadingId(productId);
    const res = await deleteSpecificWishlistItemAction(productId);
    if (res.status === "success") {
      //deep copy
      if (wishListItems && wishListItems?.count > 0) {
        const newWishList = structuredClone(wishListItems);
        // update copy
        newWishList.data = newWishList.data.filter(
          (item) => item._id !== productId,
        );
        newWishList.count = newWishList.count - 1;
        // setState
        setWishListItems(newWishList);
      }
      toast.success("Item Deleted From WishList");
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Wishlist</h1>
        {wishListItems && wishListItems.count > 0 ? (
          <>
            <p className="text-muted-foreground mt-1">
              {wishListItems.count} items in your wishlist
            </p>
            <div className="grid grid-cols-1 gap-6 lg:items-start mt-6">
              <div className=" space-y-4">
                {wishListItems.data.map((item) => (
                  <div
                    className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card relative"
                    key={item._id}
                  >
                    {isLoadingId === item._id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                        <Loader2 className="animate-spin" />
                      </div>
                    )}
                    <Image
                      alt={item.title}
                      width={100}
                      height={100}
                      className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                      src={item.imageCover}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.category.name} - {item.brand.name}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-semibold">
                            {formatCurrency(item.price)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <button
                          onClick={() => deleteSpecificItemById(item._id)}
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
            </div>
          </>
        ) : (
          <div className="min-h-[60vh] flex flex-col gap-4 items-center justify-center">
            <h2 className="text-2xl font-semibold">Your WishList Is Empty</h2>
            <button
              data-slot="button"
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
            >
              <Link href={"/products"}>Add ones</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
