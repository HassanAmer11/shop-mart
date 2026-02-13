import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import AddToCart from "@/components/Cart/AddToCart";
import { Product } from "@/Interfaces/ProductInterface";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <>
      <div className="rounded-sm">
        <Card className="mx-auto w-full max-w-sm">
          <Link href={"/products/" + product.id}>
            <Image
              src={product.imageCover}
              alt={product.title}
              className="w-full h-65 object-cover"
              width={200}
              height={200}
            />
            <CardHeader className="gap-0.5 items-start">
              <small className="text-gray-500">{product.brand.name}</small>
              <CardTitle className=" line-clamp-1 py-1">
                {product.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {product.category.name}
              </CardDescription>
              <div className="flex gap-0.5">
                <Star fill="gold" color="none" />
                <Star fill="gold" color="none" />
                <Star fill="gold" color="none" />
                <Star fill="gold" color="none" />
                <Star fill="gold" color="none" />
              </div>
              <CardDescription className="text-lg font-bold text-black">
                EGP {product.price}
              </CardDescription>
            </CardHeader>
          </Link>
          <AddToCart productId={product.id} />
        </Card>
      </div>
    </>
  );
}
