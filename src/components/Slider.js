function Slider(props) {

  const { name, minValue, maxValue, value, handleFunction } = props;

  return (
    <div className="rotate flex-row">
      <p>{name}:</p>
      <input type="number" className="number-input" id="rotate-input" min={minValue} max={maxValue} value={value} onChange={handleFunction} />
      <input type="range" className="range-slider" id="rotate-slider" min={minValue} max={maxValue} value={value} onChange={handleFunction} />
    </div>
  )
}

export default Slider;