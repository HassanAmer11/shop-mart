import ProductCard from "@/components/Product/ProductCard";
import { BrandResponse } from "@/Interfaces/BrandInterface";
import { ProductResponse } from "@/Interfaces/ProductInterface";
import { Params } from "next/dist/server/request/params";
import Link from "next/link";

export default async function page({ params }: { params: Params }) {
  const { brandId } = await params;
  const response = await fetch(process.env.API_URL + "brands/" + brandId);
  const { data }: BrandResponse = await response.json();

  const responseDetails = await fetch(
    `${process.env.API_URL}products?brand=${brandId}`,
  );
  const productData: ProductResponse | null = await responseDetails.json();

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {data.name}
          </h1>
          <p className="text-muted-foreground">Products from this brand</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productData && productData.data.length > 0 ? (
            productData.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h2 className="text-2xl font-semibold mb-4">
                No products found for this brand.
              </h2>
              <p className="text-muted-foreground">
                Please check back later or explore other brands.
              </p>
              <Link
                href="/brands"
                className="text-primary hover:underline mt-4 inline-block"
              >
                Back to Brands
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
