export function formatCurrency(num: number) {
  return new Intl.NumberFormat("en-eg", {
    style: "currency",
    currency: "EGP",
  }).format(num);
}