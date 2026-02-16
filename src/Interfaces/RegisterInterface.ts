import { UserInterface } from "./AuthInterface";

export interface RegisterInterface {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string;
}

export interface RegisterResponse {
  message: string;
  user: UserInterface;
  token: string;
}


