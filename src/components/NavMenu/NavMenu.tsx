"use client";
import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";





export default function NavMenu() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <>
      <button
        className="px-3 py-2 border rounded shadow-2xl text-slate-400 md:hidden cursor-pointer order-1"
        onClick={() => setisOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div className="order-2 md:order-0 flex-basis-full md:flex-basis-auto">
        <ul
          className={`${
            isOpen ? "flex-wrap md:flex-nowrap md:flex" : "hidden md:flex"
          }  gap-5 font-bold pt-4 space-y-4 md:space-y-0 md:pt-0 justify-items-center basis-full md:basis-0 `}
        >
          <li className="w-full md:w-auto">
            <Link className="py-2 px-3 block md:inline-block" href="/products">
              Products
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link
              className="py-2 px-3 block md:inline-block"
              href="/categories"
            >
              {" "}
              Categories
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link className="py-2 px-3 block md:inline-block" href={"/brands"}>
              {" "}
              Brands
            </Link>
          </li>
        </ul>
      </div>
      {/* <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/products">Products</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/categories">Categories</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/brands">Brands</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div> */}
    </>
  );
}
