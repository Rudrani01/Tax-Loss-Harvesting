import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
import PreHarvestCard from "../components/cards/PreHarvestCard";
import AfterHarvestCard from "../components/cards/AfterHarvestCard";
import HoldingsTable from "../components/table/HoldingsTable";
import "./Dashboard.css";

const Dashboard = () => {
  const { theme } = useTheme();
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`page--${theme}`}>
      <Header />
      <main className="dashboard">

        {/* Title row */}
        <div className="title-row">
          <h2 className={`page-title--${theme}`}>Tax Harvesting</h2>
          <div className="how-wrapper">
            <button
              className="how-link"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            >
              How it works?
            </button>
            {showTooltip && (
              <div className={`tooltip--${theme}`} role="tooltip">
                <p>
                  Lorem ipsum dolor sit amet consectetur. Euismod id posuere
                  nibh semper mattis scelerisque tellus. Vel mattis diam duis
                  morbi tellus dui consectetur.
                </p>
                <span className="know-more">Know More →</span>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`disclaimer--${theme}`}>
          <button
            className={`disc-header--${theme}`}
            onClick={() => setDisclaimerOpen((o) => !o)}
            aria-expanded={disclaimerOpen}
          >
            <span className="disc-icon-wrap">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6.5" stroke="#3b82f6" />
                <text
                  x="7"
                  y="11"
                  textAnchor="middle"
                  fill="#3b82f6"
                  fontSize="9"
                  fontWeight="700"
                >
                  i
                </text>
              </svg>
            </span>
            <span>Important Notes &amp; Disclaimers</span>
            <span className={`disc-chevron--${theme}`}>
              {disclaimerOpen ? "▲" : "▼"}
            </span>
          </button>
          {disclaimerOpen && (
            <ul className={`disc-list--${theme}`}>
              <li>Tax-loss harvesting may not be applicable in all jurisdictions including India.</li>
              <li>Derivative and futures transactions are excluded from calculations.</li>
              <li>Price data sourced from CoinGecko; values are indicative only.</li>
              <li>Only realised losses from actual sell transactions are counted.</li>
            </ul>
          )}
        </div>

        {/* Cards */}
        <div className="cards-grid">
          <PreHarvestCard />
          <AfterHarvestCard />
        </div>

        {/* Table */}
        <HoldingsTable />

      </main>
    </div>
  );
};

export default Dashboard;