import getProductsAction from "@/Actions/Product/product.action";
import Product from "@/components/Product/Product";

export default async function Products() {
  const data = await getProductsAction(1);

  return <>{data && <Product productList={data} />}</>;
}
