import { useEffect, useState } from 'react'
import importedData from './assets/data.json'
import './App.css'

// Import components
import InputControls from './components/InputControls/InputControls'
import InputDetails from './components/InputDetails/InputDetails'
import Reactor from './components/Reactor/Reactor'
import OutputPanel from './components/OutputPanel/OutputPanel'

function App() {
  const [data, setData] = useState(null)
  const [biod_metoh_ratio_options, setBiod_metoh_ratio_options] = useState(['80/20', '70/30'])
  const [biod_metoh_ratio, setBiod_metoh_ratio] = useState('80/20')
  const [temperature_C, setTemperature_C] = useState(25)
  const [water_percent, setWater_percent] = useState(20.0)
  const [output, setOutput] = useState(null)

  const getOutput = () => {
    // find all objects with the same biod_metoh_ratio
    const data = importedData.filter(item => item.biod_metoh_ratio === biod_metoh_ratio)
    if (data.length === 0) return null;
    
    // find the object with the same temperature_C and water_percent
    const exactMatch = data.find(item => item.temperature_C === temperature_C && item.water_percent === water_percent)
    if (exactMatch) {
      return exactMatch.phase
    }
    
    // Find the closest points for interpolation
    const lowerTemp = Math.max(...data.filter(item => item.temperature_C <= temperature_C).map(item => item.temperature_C));
    const upperTemp = Math.min(...data.filter(item => item.temperature_C >= temperature_C).map(item => item.temperature_C));
    const lowerWater = Math.max(...data.filter(item => item.water_percent <= water_percent).map(item => item.water_percent));
    const upperWater = Math.min(...data.filter(item => item.water_percent >= water_percent).map(item => item.water_percent));
    
    // Get the four corner points
    const q11 = data.find(item => item.temperature_C === lowerTemp && item.water_percent === lowerWater);
    const q12 = data.find(item => item.temperature_C === lowerTemp && item.water_percent === upperWater);
    const q21 = data.find(item => item.temperature_C === upperTemp && item.water_percent === lowerWater);
    const q22 = data.find(item => item.temperature_C === upperTemp && item.water_percent === upperWater);
    
    // If we can't find all corner points for interpolation, return the closest match
    if (!q11 || !q12 || !q21 || !q22) {
      const closest = data.reduce((prev, curr) => {
        const prevDist = Math.abs(prev.temperature_C - temperature_C) + Math.abs(prev.water_percent - water_percent);
        const currDist = Math.abs(curr.temperature_C - temperature_C) + Math.abs(curr.water_percent - water_percent);
        return prevDist < currDist ? prev : curr;
      });
      return closest.phase;
    }
    
    // Calculate interpolation weights
    const xWeight = (upperTemp === lowerTemp) ? 0 : (temperature_C - lowerTemp) / (upperTemp - lowerTemp);
    const yWeight = (upperWater === lowerWater) ? 0 : (water_percent - lowerWater) / (upperWater - lowerWater);
    
    // Perform bilinear interpolation for each property
    const output = {};
    const phaseKeys = Object.keys(q11.phase);
    
    for (const phaseKey of phaseKeys) {
      output[phaseKey] = {};
      const compKeys = Object.keys(q11.phase[phaseKey]);
      
      for (const compKey of compKeys) {
        const f11 = q11.phase[phaseKey][compKey];
        const f12 = q12.phase[phaseKey][compKey];
        const f21 = q21.phase[phaseKey][compKey];
        const f22 = q22.phase[phaseKey][compKey];
        
        // Bilinear interpolation formula
        output[phaseKey][compKey] = 
          (1 - xWeight) * (1 - yWeight) * f11 +
          (1 - xWeight) * yWeight * f12 +
          xWeight * (1 - yWeight) * f21 +
          xWeight * yWeight * f22;
        
        // Round to avoid floating point errors
        output[phaseKey][compKey] = Math.round(output[phaseKey][compKey] * 100) / 100;
      }
    }
    
    return output;
  }

  useEffect(() => {
    setData(importedData)
  }, [])

  useEffect(() => {
    const output = getOutput()
    setOutput(output)
  }, [biod_metoh_ratio, temperature_C, water_percent])

  return (
    <div className="simulator-container">
      <h1>Chemical Reactor Simulator</h1>
      
      <div className="simulator">
        <InputControls
          biod_metoh_ratio={biod_metoh_ratio}
          biod_metoh_ratio_options={biod_metoh_ratio_options}
          temperature_C={temperature_C}
          water_percent={water_percent}
          setBiod_metoh_ratio={setBiod_metoh_ratio}
          setTemperature_C={setTemperature_C}
          setWater_percent={setWater_percent}
        />
        
        <div className="reactor">
          <div className="inputs">
            <InputDetails
              biod_metoh_ratio={biod_metoh_ratio}
              temperature_C={temperature_C}
              water_percent={water_percent}
            />
            
            <Reactor
              biod_metoh_ratio={biod_metoh_ratio}
              temperature_C={temperature_C}
              water_percent={water_percent}
            />
            
            <OutputPanel output={output} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App