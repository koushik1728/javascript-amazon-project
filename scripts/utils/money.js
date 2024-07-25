
export function moneyFormat(priceCents){
  return (priceCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}