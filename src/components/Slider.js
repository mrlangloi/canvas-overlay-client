import React from 'react';

// range slider component

function Slider(props) {

  const { name, minValue, maxValue, value, handleChange } = props;

  return (
    <div className="rotate flex-row">
      {/* name variable has to match the object's variable name, so this is to capitalize the name */}
      <p>{name.charAt(0).toUpperCase() + name.slice(1)}:</p>
      <input type="number" className="number-input" name={name} min={minValue} max={maxValue} value={value} onChange={handleChange} />
      <input type="range" className="range-slider" name={name} min={minValue} max={maxValue} value={value} onChange={handleChange} />
    </div>
  )
}

export default Slider;