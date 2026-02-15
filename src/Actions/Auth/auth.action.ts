"use server";
import {
  RegisterInterface,
  RegisterResponse,
} from "@/Interfaces/RegisterInterface";

export async function registerUser(userData: RegisterInterface) {
  const response = await fetch(process.env.API_URL + "auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data: RegisterResponse = await response.json();
  return data;
}
