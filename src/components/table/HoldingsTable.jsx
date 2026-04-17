import { useState } from "react";
import { useHarvest } from "../../context/HarvestContext";
import { useTheme } from "../../context/ThemeContext";
import { formatINR, formatHolding, formatPrice } from "../../utils/calculations";
import "./Table.css";

const INITIAL_SHOW = 6;

const HoldingsTable = () => {
  const { holdings, selectedAssets, handleSelect, handleSelectAll, isSelected, loading, error } =
    useHarvest();
  const { theme } = useTheme();
  const [showAll, setShowAll] = useState(false);
  const [stSort, setStSort] = useState(null); // null | "asc" | "desc"

  if (loading) return <div className={`table-container ${theme}`}><div className="table-loading">Loading holdings...</div></div>;
  if (error) return <div className={`table-container ${theme}`}><div className="table-error">Error: {error}</div></div>;

  const baseData = showAll ? holdings : holdings.slice(0, INITIAL_SHOW);

  const visibleData = stSort
    ? [...baseData].sort((a, b) =>
        stSort === "asc"
          ? a.stcg.gain - b.stcg.gain
          : b.stcg.gain - a.stcg.gain
      )
    : baseData;

  const allVisibleSelected =
    visibleData.length > 0 && visibleData.every((h) => isSelected(h));

  const toggleStSort = () => {
    setStSort((prev) => (prev === null ? "desc" : prev === "desc" ? "asc" : null));
  };

  const chevron =
    stSort === "desc" ? " ↓" : stSort === "asc" ? " ↑" : " ↕";

  return (
    <div className={`table-container ${theme}`}>
      <h3 className="table-title">Holdings</h3>

      {/* Desktop table */}
      <div className="table-scroll">
        <table className="holdings-table">
          <thead>
            <tr>
              <th className="col-check">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="checkbox"
                />
              </th>
              <th className="col-asset">Asset</th>
              <th className="col-holdings">
                Holdings<br />
                <span className="sub-header">Avg Buy Price</span>
              </th>
              <th className="col-value">Total Current Value</th>
              <th
                className="col-st col-st-header"
                onClick={toggleStSort}
                title="Sort by Short-term gain"
              >
                Short-term
                <span className="sort-chevron">{chevron}</span>
              </th>
              <th className="col-lt">Long-Term</th>
              <th className="col-sell">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, i) => {
              const checked = isSelected(item);
              const cv = item.totalHolding * item.currentPrice;
              const stG = item.stcg.gain;
              const ltG = item.ltcg.gain;

              return (
                <tr
                  key={`${item.coin}-${item.coinName}-${i}`}
                  className={`holdings-row ${checked ? "row-selected" : ""}`}
                  onClick={() => handleSelect(item)}
                >
                  <td className="col-check">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleSelect(item)}
                      onClick={(e) => e.stopPropagation()}
                      className="checkbox"
                    />
                  </td>
                  <td className="col-asset">
                    <div className="asset-info">
                      <img
                        src={item.logo}
                        alt={item.coin}
                        className="coin-logo"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="coin-fallback" style={{ display: "none" }}>
                        {item.coin.slice(0, 2)}
                      </div>
                      <div>
                        <div className="coin-name">{item.coinName}</div>
                        <div className="coin-symbol">{item.coin}</div>
                      </div>
                    </div>
                  </td>
                  <td className="col-holdings">
                    <div className="holding-amount">
                      {formatHolding(item.totalHolding, item.coin)}
                    </div>
                    <div className="holding-avg">
                      {formatPrice(item.averageBuyPrice)}/{item.coin}
                    </div>
                  </td>
                  <td className="col-value">{formatINR(cv)}</td>
                  <td className="col-st">
                    <div className={stG < 0 ? "neg" : "pos"}>{formatINR(stG)}</div>
                    <div className="gain-balance">{formatHolding(item.stcg.balance, item.coin)}</div>
                  </td>
                  <td className={`col-lt ${ltG < 0 ? "neg" : ltG > 0 ? "pos" : ""}`}>
                    <div>{formatINR(ltG)}</div>
                    <div className="gain-balance">{formatHolding(item.ltcg.balance, item.coin)}</div>
                  </td>
                  <td className="col-sell">
                    {checked ? (
                      <span className="sell-amount">
                        {formatHolding(item.totalHolding, item.coin)}
                      </span>
                    ) : (
                      <span className="sell-dash">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mobile-cards">
        <div className="mobile-select-all">
          <label className="mobile-select-label">
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="checkbox"
            />
            <span>Asset</span>
            <span style={{ marginLeft: "auto", paddingRight: "4px" }}>Holdings</span>
          </label>
        </div>

        {visibleData.map((item, i) => {
          const checked = isSelected(item);
          return (
            <div
              key={`mob-${item.coin}-${i}`}
              className={`mobile-card ${checked ? "mobile-card-selected" : ""}`}
              onClick={() => handleSelect(item)}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleSelect(item)}
                onClick={(e) => e.stopPropagation()}
                className="checkbox"
              />
              <div className="asset-info">
                <img
                  src={item.logo}
                  alt={item.coin}
                  className="coin-logo"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="coin-fallback" style={{ display: "none" }}>
                  {item.coin.slice(0, 2)}
                </div>
                <div>
                  <div className="coin-name">{item.coinName}</div>
                  <div className="coin-symbol">{item.coin}</div>
                </div>
              </div>
              <div className="mobile-holdings">
                <div className="mobile-holdings-amount">
                  {formatHolding(item.totalHolding, item.coin)}
                </div>
                <div className="mobile-holdings-avg">
                  {formatPrice(item.averageBuyPrice)}/{item.coin}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View all / View less */}
      {holdings.length > INITIAL_SHOW && (
        <div className="view-all-wrapper">
          <button className="view-all-btn" onClick={() => setShowAll((p) => !p)}>
            {showAll ? "View less" : `View all (${holdings.length})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;