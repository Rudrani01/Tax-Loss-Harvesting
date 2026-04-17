export const fetchHoldings = async () => {
  const res = await fetch("/data/holdings.json");
  if (!res.ok) throw new Error("Failed to fetch holdings");
  return res.json();
};

export const fetchCapitalGains = async () => {
  const res = await fetch("/data/capitalGains.json");
  if (!res.ok) throw new Error("Failed to fetch capital gains");
  return res.json();
};