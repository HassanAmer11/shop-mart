import { CartItem } from "./CartInterface";
import { ShippingAddress } from "./ShippingAddressInterface";

export type OrdersResponse = OrdersResponse2[];

export interface OrdersResponse2 {
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
  paidAt?: string;
}


export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}





