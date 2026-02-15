"use client";
import Link from "next/link";
import { useState } from "react";

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

      <ul
        className={`${
          isOpen ? "flex-wrap md:flex-nowrap md:flex" : "hidden md:flex"
        }  order-2 md:order-0 gap-5 font-bold space-y-4 md:space-y-0 md:pt-0 justify-items-center basis-full md:basis-auto `}
      >
        <li className="w-full md:w-auto">
          <Link className="custom-nav-link" href="/products">
            Products
          </Link>
        </li>
        <li className="w-full md:w-auto">
          <Link className="custom-nav-link" href="/categories">
            {" "}
            Categories
          </Link>
        </li>
        <li className="w-full md:w-auto">
          <Link className="custom-nav-link" href={"/brands"}>
            {" "}
            Brands
          </Link>
        </li>
      </ul>
    </>
  );
}
