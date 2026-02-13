import AddToCart from "@/components/Cart/AddToCart";
import Slider from "@/components/Slider/Slider";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/Interfaces/ProductInterface";
import { Star } from "lucide-react";
import { Params } from "next/dist/server/request/params";

export default async function ProductDetails({ params }: { params: Params }) {
  const { ProductId } = await params;
  const response = await fetch(`${process.env.API_URL}products/${ProductId}`);
  const { data: product }: { data: Product } = await response.json();

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-7/10">
        <div className="flex items-center flex-col md:flex-row gap-3">
          <div className="p-2 w-full md:w-1/2">
            {product?.images.length > 0 && (
              <Slider images={product.images} title={product.title} />
            )}
          </div>

          <div className="grow w-full">
            <CardHeader className="gap-2 items-start">
              <div className="">
                <small className="text-gray-500">{product.brand.name}</small>
                <CardTitle className="py-1">{product.title}</CardTitle>
              </div>
              <CardDescription className="text-gray-900 text-[1rem]">
                {product.description}
              </CardDescription>
              <div className="">
                <CardDescription className="text-gray-600 py-1">
                  {product.category.name}
                </CardDescription>
                <div className="flex gap-0.5">
                  <Star fill="gold" color="none" />
                  <Star fill="gold" color="none" />
                  <Star fill="gold" color="none" />
                  <Star fill="gold" color="none" />
                  <Star fill="gold" color="none" />
                  <CardDescription className="text-gray-600">
                    ({product.ratingsQuantity})
                  </CardDescription>
                </div>
              </div>
              <CardDescription className="text-lg font-bold text-black">
                EGP {product.price}
              </CardDescription>
            </CardHeader>

            <div className="mt-2">
              <AddToCart productId={product.id} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
