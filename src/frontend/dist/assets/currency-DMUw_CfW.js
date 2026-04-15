const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});
function formatCurrency(amount) {
  return formatter.format(amount);
}
export {
  formatCurrency as f
};
