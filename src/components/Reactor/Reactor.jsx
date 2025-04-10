import React from 'react';
import './Reactor.css';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';

const Reactor = ({ biod_metoh_ratio, temperature_C, water_percent }) => {
  return (
    <div className="reactor-system">
      {/* Top input for biodiesel/methanol */}
      <div className="input-pipe biod-meth-pipe">
        <div className="pipe-label">Biodiesel/Methanol {biod_metoh_ratio}</div>
        <div className="pipe-horizontal"></div>
        <div className="pipe-vertical">
          <div className="flow-particle p1"></div>
          <div className="flow-particle p2"></div>
          <div className="flow-particle p3"></div>
          <div className="flow-direction-arrow">
  <FaLongArrowAltDown color="#ff9800" size={20} />
</div>
        </div>
      </div>
      
      <div className="reactor-vessel">
        {/* Temperature indicator */}
        <div className="temperature-indicator">
          <div className="thermometer">
            <div 
              className="thermometer-fill" 
              style={{ 
                height: `${((temperature_C - 25) / (40 - 25)) * 100}%` 
              }}
            ></div>
          </div>
          <div className="temperature-label">{temperature_C}°C</div>
        </div>
        
        <div className="vessel-body">
          {/* Falling particles from top */}
          <div className="falling-particle fp1"></div>
          <div className="falling-particle fp2"></div>
          <div className="falling-particle fp3"></div>
          
          {/* Rising particles from bottom */}
          <div className="rising-particle rp1"></div>
          <div className="rising-particle rp2"></div>
          <div className="rising-particle rp3"></div>
          
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
          <div className="bubble bubble-5"></div>
        </div>
        <div className="vessel-bottom"></div>
        
        {/* Bottom input for water */}
        <div className="water-input">
          <div className="water-pipe">
            <div className="flow-particle w1"></div>
            <div className="flow-particle w2"></div>
            <div className="flow-direction-arrow">
  <FaLongArrowAltUp color="#2196f3" size={20} />
</div>
          </div>
          <div className="pipe-label">Water {water_percent}%</div>
        </div>
      </div>
      
      {/* Output pipes */}
      <div className="output-pipes">
        <div className="e1-output-pipe">
          <div className="pipe-horizontal"></div>
          <div className="pipe-label">E1</div>
        </div>
        <div className="rn-output-pipe">
          <div className="pipe-horizontal"></div>
          <div className="pipe-label">Rn</div>
        </div>
      </div>
    </div>
  );
};

export default Reactor;