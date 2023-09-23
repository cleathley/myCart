/**
 * Return the value as a properly formatted currency for the current locale.
 *
 * @param   {number}  value
 * @return  {string}
 */
function formatCurrency(value: number): string {
  const currency = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });
  return currency.format(value);
}

export default formatCurrency;
