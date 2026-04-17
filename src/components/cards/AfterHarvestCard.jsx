import { useHarvest } from "../../context/HarvestContext";
import { formatINR } from "../../utils/calculations";
import "./Card.css";

const AfterHarvestCard = () => {
  const { updatedGains, savings } = useHarvest();

  if (!updatedGains) return <div className="card after-card skeleton" />;

  const { stcg, ltcg } = updatedGains;
  const stNet = stcg.profits - stcg.losses;
  const ltNet = ltcg.profits - ltcg.losses;
  const total = stNet + ltNet;

  return (
    <div className="card after-card">
      <h3 className="card-title">After Harvesting</h3>
      <div className="gains-table">
        <div className="gains-row gains-header">
          <span></span>
          <span>Short-term</span>
          <span>Long-term</span>
        </div>
        <div className="gains-row">
          <span>Profits</span>
          <span>{formatINR(stcg.profits)}</span>
          <span>{formatINR(ltcg.profits)}</span>
        </div>
        <div className="gains-row">
          <span>Losses</span>
          <span className="loss-val-blue">- {formatINR(stcg.losses)}</span>
          <span className="loss-val-blue">- {formatINR(ltcg.losses)}</span>
        </div>
        <div className="gains-row net-row">
          <span>Net Capital Gains</span>
          <span className={stNet < 0 ? "loss-val-blue" : ""}>{formatINR(stNet)}</span>
          <span className={ltNet < 0 ? "loss-val-blue" : ""}>{formatINR(ltNet)}</span>
        </div>
      </div>
      <div className="card-footer">
        <span className="footer-label">Effective Capital Gains:</span>
        <span className="footer-amount">{formatINR(total)}</span>
      </div>
      {savings > 0 && (
        <div className="save-banner">
          🎉 You are going to save upto&nbsp;
          <strong>{formatINR(savings)}</strong>
        </div>
      )}
    </div>
  );
};

export default AfterHarvestCard;