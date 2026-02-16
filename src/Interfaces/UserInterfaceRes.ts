export interface UserInterfaceResponse {
  totalUsers: number;
  metadata: Metadata;
  users: UserInterfaceRes[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface UserInterfaceRes {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}
