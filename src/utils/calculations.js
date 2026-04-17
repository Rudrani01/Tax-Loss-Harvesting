export const calculateAfterHarvest = (base, selectedAssets) => {
  if (!base) return null;

  const updated = {
    stcg: { profits: base.stcg.profits, losses: base.stcg.losses },
    ltcg: { profits: base.ltcg.profits, losses: base.ltcg.losses },
  };

  selectedAssets.forEach((asset) => {
    const st = asset.stcg?.gain || 0;
    const lt = asset.ltcg?.gain || 0;

    if (st >= 0) updated.stcg.profits += st;
    else updated.stcg.losses += Math.abs(st);

    if (lt >= 0) updated.ltcg.profits += lt;
    else updated.ltcg.losses += Math.abs(lt);
  });

  return updated;
};

export const formatINR = (value) => {
  const abs = Math.abs(value);
  let formatted;
  if (abs === 0) formatted = "₹ 0.00";
  else if (abs >= 1000)
    formatted =
      "₹ " +
      abs.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
  else if (abs >= 0.01)
    formatted = "₹ " + abs.toFixed(2);
  else
    formatted = "₹ " + abs.toExponential(2);

  return value < 0 ? "- " + formatted : formatted;
};

export const formatHolding = (n, coin) => {
  if (Math.abs(n) < 1e-6) return n.toExponential(2) + " " + coin;
  if (Math.abs(n) > 10000)
    return (
      n.toLocaleString("en-IN", { maximumFractionDigits: 4 }) + " " + coin
    );
  const s = parseFloat(n.toPrecision(6)).toString();
  return s + " " + coin;
};

export const formatPrice = (n) => {
  if (n === 0) return "₹ 0";
  if (n < 0.0001) return "₹ " + n.toExponential(2);
  if (n < 1) return "₹ " + n.toFixed(6);
  return (
    "₹ " +
    n.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  );
};