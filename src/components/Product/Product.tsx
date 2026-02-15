"use client";

import { ProductResponse } from "@/Interfaces/ProductInterface";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import ProductCard from "@/components/Product/ProductCard";
import Loading from "@/app/(pages)/loading";
import getProductsAction from "@/Actions/Product/product.action";

export default function Product({ productList }: { productList : ProductResponse|null}) {
  const [result, setResult] = useState<ProductResponse | null>(productList);
  const [isLoading, setIsLoading] = useState(false);

  async function getDataByPage(page: number) {
    setIsLoading(true);
    const data = await getProductsAction(page);
    if (data) {
      setResult(data);
    }
    setIsLoading(false);
  }


  return (
    <div className="pt-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {result?.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="py-10">
            <Pagination>
              <PaginationContent>
                {result?.metadata.prevPage && (
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() =>
                        getDataByPage(result?.metadata.prevPage || 1)
                      }
                    />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink isActive>
                    {result?.metadata.currentPage}
                  </PaginationLink>
                </PaginationItem>

                {result?.metadata.nextPage && (
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => getDataByPage(result.metadata.nextPage)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
}
