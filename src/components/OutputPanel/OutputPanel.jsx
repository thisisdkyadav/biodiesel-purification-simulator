import React from 'react';
import CompositionBar from '../CompositionBar/CompositionBar';
import './OutputPanel.css';

const OutputPanel = ({ output }) => {
  return (
    <div className="output-streams">
      {output ? (
        <>
          <div className="output-stream e1">
            <h3>E1 Phase</h3>
            <h4>Mole Fractions</h4>
            <CompositionBar phaseData={output.E1} />
          </div>
          
          <div className="output-stream rn">
            <h3>Rn Phase</h3>
            <h4>Mole Fractions</h4>
            <CompositionBar phaseData={output.Rn} />
          </div>
        </>
      ) : (
        <div className="no-output">
          <h3>No output data available</h3>
          <p>Try different input parameters</p>
        </div>
      )}
    </div>
  );
};

export default OutputPanel;