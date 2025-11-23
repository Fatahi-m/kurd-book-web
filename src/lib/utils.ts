export function formatPrice(price: number, currency: string = '€'): string {
  // Use a consistent format for both server and client
  return `${price.toFixed(2).replace('.', ',')} ${currency}`;
}

export function formatCurrency(amount: number): string {
  return formatPrice(amount);
}