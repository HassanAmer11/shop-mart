
export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface CheckOutResponse {
  status: string;
  session: Session;
}

export interface Session {
  url: string;
  success_url: string;
  cancel_url: string;
}
