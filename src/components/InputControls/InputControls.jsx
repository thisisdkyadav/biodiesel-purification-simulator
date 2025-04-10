import React from 'react';
import './InputControls.css';

const InputControls = ({
  biod_metoh_ratio,
  biod_metoh_ratio_options,
  temperature_C,
  water_percent,
  setBiod_metoh_ratio,
  setTemperature_C,
  setWater_percent
}) => {
  return (
    <div className="controls-panel">
      <div className="control-group">
        <label>Biodiesel/Methanol Ratio:</label>
        <div className="tabs">
          {biod_metoh_ratio_options.map((option, index) => (
            <button 
              key={index} 
              className={biod_metoh_ratio === option ? "active" : ""}
              onClick={() => setBiod_metoh_ratio(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="control-group">
        <label>Temperature: {temperature_C} °C</label>
        <input 
          type="range" 
          min="25" 
          max="40" 
          value={temperature_C} 
          onChange={(e) => setTemperature_C(Number(e.target.value))} 
        />
        <div className="range-labels">
          <span>25°C</span>
          <span>40°C</span>
        </div>
      </div>
      
      <div className="control-group">
        <label>Water Content: {water_percent}%</label>
        <input 
          type="range" 
          min="20" 
          max="60" 
          value={water_percent} 
          onChange={(e) => setWater_percent(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>20%</span>
          <span>60%</span>
        </div>
      </div>
    </div>
  );
};

export default InputControls;