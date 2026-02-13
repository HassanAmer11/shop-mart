import { BrandsResponse } from "@/Interfaces/BrandInterface";
import Image from "next/image";
import Link from "next/link";

export default async function Brands() {
  const response = await fetch(process.env.API_URL + "brands");
  const {data}: BrandsResponse = await response.json();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Brands</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.length > 0 && data.map((brand) => (
            <Link href={"/brands/" + brand._id} key={brand._id}>
              <div
                data-slot="card"
                className="bg-card text-card-foreground flex flex-col gap-4 rounded-xl border py-4 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <div
                  data-slot="card-header"
                  className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-4 p-0"
                >
                  <div className="relative w-full h-48">
                    <Image
                      alt={brand.name}
                      loading="lazy"
                      width={300}
                      height={300}
                      className="object-cover rounded-t-lg"
                      src={brand.image}
                    />
                  </div>
                </div>
                <div data-slot="card-content" className="p-4">
                  <div
                    data-slot="card-title"
                    className="text-center text-lg font-semibold"
                  >
                    {brand.name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
