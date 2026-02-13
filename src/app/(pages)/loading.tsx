import { Loader } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center gap-3">
      <h4 className="text-3xl font-bold">
        <span className="text-3xl bg-black text-white px-2 me-1 rounded-sm">
          S
        </span>
        ShopMart
      </h4>
      <Loader className="size-15 animate-spin" />
    </div>
  );
}
