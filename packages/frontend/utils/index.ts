// Utility function to convert Wei to cUSD
export const weiToCUSD = (wei: number) => {
  const cUSD = wei / 1e18;
  return cUSD.toFixed(2); // Format to 2 decimal places
};
