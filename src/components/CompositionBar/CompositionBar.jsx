import React from 'react';
import './CompositionBar.css';

const CompositionBar = ({ phaseData }) => {
  if (!phaseData) return null;
  
  const methanol = phaseData.methanol || 0;
  const biodiesel = phaseData.biodiesel || 0;
  const water = phaseData.water || 0;
  
  return (
    <div className="composition-bar">
      <div className="bar-container">
        <div className="bar methanol" style={{ width: `${methanol * 100}%` }}>
          {methanol > 0.05 ? `${(methanol * 100).toFixed(1)}%` : ''}
        </div>
        <div className="bar biodiesel" style={{ width: `${biodiesel * 100}%` }}>
          {biodiesel > 0.05 ? `${(biodiesel * 100).toFixed(1)}%` : ''}
        </div>
        <div className="bar water" style={{ width: `${water * 100}%` }}>
          {water > 0.05 ? `${(water * 100).toFixed(1)}%` : ''}
        </div>
      </div>
      <div className="legend">
        <div className="legend-item">
          <div className="color-box methanol"></div>
          <span>Methanol: {(methanol * 100).toFixed(1)}%</span>
        </div>
        <div className="legend-item">
          <div className="color-box biodiesel"></div>
          <span>Biodiesel: {(biodiesel * 100).toFixed(1)}%</span>
        </div>
        <div className="legend-item">
          <div className="color-box water"></div>
          <span>Water: {(water * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default CompositionBar;