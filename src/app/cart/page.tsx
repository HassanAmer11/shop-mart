import { getUserCartData } from "@/Actions/Cart/cart.action";
import Cart from "@/components/Cart/Cart";

export default async function Carts() {
const data = await getUserCartData();
  return (
    <>
      <Cart cartData={data} />
    </>
  );
}
