import { authOptions } from "@/authOptions";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { OrdersResponse } from "@/Interfaces/OrderInterface";
import { UserInterfaceResponse } from "@/Interfaces/UserInterfaceRes";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default async function Orders() {
  const session = await getServerSession(authOptions);
  console.log(session);
  const result = await fetch(
    process.env.API_URL + `users?email=${session?.user?.email}`,
  );
  const { users }: UserInterfaceResponse = await result.json();

  console.log(users[0]._id);
  let orderData: OrdersResponse | null = null;
  if (users && users.length > 0) {
    const res = await fetch(
      process.env.API_URL + `orders/user/${users[0]._id}`,
    );
    orderData = await res.json();
  }
  console.log(orderData);
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">All Orders</h1>
        {orderData &&
          orderData.map((order) => (
            <div
              key={order._id}
              className="mb-8 border rounded-lg shadow p-6 bg-white"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Order #{order.id}
                </h2>
                <div className="text-gray-600 text-sm mb-1">
                  Order Date: {new Date(order.createdAt).toUTCString()}
                </div>
                <div className="text-gray-600 text-sm mb-1">
                  Payment: card{" "}
                  <span
                    className={order.isPaid ? "text-green-600" : "text-red-600"}
                  >
                    ({order.isPaid ? "Paid" : "Not Paid"})
                  </span>
                </div>
                <div className="text-gray-600 text-sm mb-1">
                  Delivered:{" "}
                  <span
                    className={
                      order.isDelivered ? "text-blue-600" : "text-yellow-600"
                    }
                  >
                    {order.isDelivered ? "Yes" : "No"}
                  </span>
                </div>
                <div className="text-gray-600 text-sm">
                  Total:{" "}
                  <span className="font-bold">
                    {formatCurrency(order.totalOrderPrice)}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Shipping Address</h3>
                <div className="text-gray-700 text-sm">
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.details} <br />
                  Phone: {order.shippingAddress?.phone}
                </div>
              </div>
              <div className="mb-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary">View Order Items</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-2xs" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Order Items</DropdownMenuLabel>

                      {order.cartItems.map((item) => (
                        <DropdownMenuItem key={item._id}>
                          <Image
                            alt={item.product.title}
                            width={100}
                            height={100}
                            className="w-12 h-12 object-cover rounded"
                            src={item.product.imageCover}
                            style={{ color: "transparent" }}
                          />
                          <div className="ms-3">
                            <div className="font-medium line-clamp-2">
                              {item.product.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              Qty: {item.count} &nbsp;|&nbsp; Price:{" "}
                              {item.price} EGP
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="text-right text-sm text-gray-500">
                Last updated:{" "}
                {new Date(order.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
