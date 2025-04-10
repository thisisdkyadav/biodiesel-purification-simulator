import React from 'react';
import './InputDetails.css';

const InputDetails = ({ biod_metoh_ratio, temperature_C, water_percent }) => {
  return (
    <div className="input-feed">
      <h3>Inputs</h3>
      <div className="param-group">
        <span className="param-label">Biod/Meth Ratio:</span>
        <span className="param-value">{biod_metoh_ratio}</span>
      </div>
      <div className="param-group">
        <span className="param-label">Temperature:</span>
        <span className="param-value">{temperature_C} °C</span>
      </div>
      <div className="param-group">
        <span className="param-label">Water Content:</span>
        <span className="param-value">{water_percent}%</span>
      </div>
    </div>
  );
};

export default InputDetails;