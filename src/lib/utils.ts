export function formatPrice(price: number, currency: string = '€'): string {
  // Use a consistent format for both server and client
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${currency}`;
}

export function formatCurrency(amount: number): string {
  return formatPrice(amount);
}