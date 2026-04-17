import { createContext, useContext, useState, useEffect } from "react";
import { fetchHoldings, fetchCapitalGains } from "../services/api";
import { calculateAfterHarvest } from "../utils/calculations";

const HarvestContext = createContext(null);

export const HarvestProvider = ({ children }) => {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        setHoldings(holdingsData || []);
        setCapitalGains(gainsData.capitalGains || gainsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSelect = (asset) => {
    setSelectedAssets((prev) => {
      const exists = prev.find(
        (i) => i.coin === asset.coin && i.coinName === asset.coinName
      );
      return exists
        ? prev.filter(
            (i) => !(i.coin === asset.coin && i.coinName === asset.coinName)
          )
        : [...prev, asset];
    });
  };

  const handleSelectAll = (checked) => {
    setSelectedAssets(checked ? [...holdings] : []);
  };

  const isSelected = (asset) =>
    selectedAssets.some(
      (i) => i.coin === asset.coin && i.coinName === asset.coinName
    );

  const updatedGains =
    capitalGains && selectedAssets.length > 0
      ? calculateAfterHarvest(capitalGains, selectedAssets)
      : capitalGains;

  const getTotal = (data) => {
    if (!data) return 0;
    return (
      data.stcg.profits - data.stcg.losses + (data.ltcg.profits - data.ltcg.losses)
    );
  };

  const preTotal = getTotal(capitalGains);
  const postTotal = getTotal(updatedGains);
  const savings = preTotal > postTotal ? preTotal - postTotal : 0;

  return (
    <HarvestContext.Provider
      value={{
        holdings,
        capitalGains,
        updatedGains,
        selectedAssets,
        loading,
        error,
        handleSelect,
        handleSelectAll,
        isSelected,
        savings,
        preTotal,
        postTotal,
      }}
    >
      {children}
    </HarvestContext.Provider>
  );
};

export const useHarvest = () => {
  const ctx = useContext(HarvestContext);
  if (!ctx) throw new Error("useHarvest must be used within HarvestProvider");
  return ctx;
};