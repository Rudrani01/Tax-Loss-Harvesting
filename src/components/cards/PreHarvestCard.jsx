import { useHarvest } from "../../context/HarvestContext";
import { useTheme } from "../../context/ThemeContext";
import { formatINR } from "../../utils/calculations";
import "./Card.css";

const PreHarvestCard = () => {
  const { capitalGains } = useHarvest();
  const { theme } = useTheme();

  if (!capitalGains) return <div className={`card pre-card skeleton ${theme}`} />;

  const { stcg, ltcg } = capitalGains;
  const stNet = stcg.profits - stcg.losses;
  const ltNet = ltcg.profits - ltcg.losses;
  const total = stNet + ltNet;

  return (
    <div className={`card pre-card ${theme}`}>
      <h3 className="card-title">Pre Harvesting</h3>
      <div className="gains-table">
        <div className="gains-row gains-header">
          <span></span>
          <span>Short-term</span>
          <span>Long-term</span>
        </div>
        <div className="gains-row">
          <span>Profits</span>
          <span className="profit-val">{formatINR(stcg.profits)}</span>
          <span className="profit-val">{formatINR(ltcg.profits)}</span>
        </div>
        <div className="gains-row">
          <span>Losses</span>
          <span className="loss-val">- {formatINR(stcg.losses)}</span>
          <span className="loss-val">- {formatINR(ltcg.losses)}</span>
        </div>
        <div className="gains-row net-row">
          <span>Net Capital Gains</span>
          <span className={stNet < 0 ? "loss-val" : ""}>{formatINR(stNet)}</span>
          <span className={ltNet < 0 ? "loss-val" : ""}>{formatINR(ltNet)}</span>
        </div>
      </div>
      <div className="card-footer">
        <span className="footer-label">Realised Capital Gains:</span>
        <span className="footer-amount">{formatINR(total)}</span>
      </div>
    </div>
  );
};

export default PreHarvestCard;