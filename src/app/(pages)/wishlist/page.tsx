import { getUserWishlistData } from "@/Actions/Wishlist/wishlist.action";
import WishListComponent from "@/components/WishList/WishListComponent";
import { wishListResponse } from "@/Interfaces/wishListInterface";

export default async function wishlist() {
  const wishList: wishListResponse = await getUserWishlistData();
  return (
    <>
      <WishListComponent wishList={wishList} />
    </>
  );
}
