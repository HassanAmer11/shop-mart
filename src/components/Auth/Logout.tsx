"use client";
import { MenubarItem } from "@radix-ui/react-menubar";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <MenubarItem className="border-0">
      <div
        className="cursor-pointer ps-2 text-sm hover:bg-gray-100 hover:border-0 py-1 border-0"
        onClick={() => {
          signOut({
            callbackUrl: "/",
          });
        }}
      >
        Sign out
      </div>
    </MenubarItem>
  );
}
