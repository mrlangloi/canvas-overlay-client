
// settings to fine-tune the properties of the media card

function MediaControls(props) {

  const { 
    activeElement,
    posX,
    setPosX, 
    posY,
    setPosY,
    rotation,
    setRotation,
    scale,
    setScale,
    opacity,
    setOpacity,
    zIndex,
    setZIndex,
    imgSrc,
    setImgSrc,
  } = props;

  function handleImageSourceChange(e) {
    setImgSrc(e.target.value);
    const imgElement = activeElement.querySelector('img');
    imgElement.src = e.target.value;
  }

  function handlePosXChange(e) {
    setPosX(e.target.value);
    activeElement.style.left = `${e.target.value}px`;
  }

  function handlePosYChange(e) {
    setPosY(e.target.value);
    activeElement.style.top = `${e.target.value}px`;
  }

  function handleRotationChange(e) {
    setRotation(e.target.value);
    activeElement.style.rotate = `${e.target.value}deg`;
  }

  function handleScaleChange(e) {
    setScale(e.target.value);
    activeElement.style.scale = `${e.target.value / 100}`;
  }

  function handleOpacityChange(e) {
    setOpacity(e.target.value);
    activeElement.style.opacity = `${e.target.value / 100}`;
  }

  function handleZIndexChange(e) {
    setZIndex(e.target.value);
    activeElement.style.zIndex = e.target.value;
  }

  if (!activeElement) {
    return (
      <div className="media-control">
        <div className="media-control-header">
          <p>Media Control</p>
        </div>

        <div className="media-control-body">
          <p>Select a media card to adjust its properties</p>
        </div>
      </div>
    )
  }

  return (
    <div className="media-control">
      <div className="media-control-header">
        <p>{activeElement.id}</p>
      </div>

      <div className="media-control-body">
        <div className="imageSource">
          <input type="text" className="text-input" id="image-source-input" value={imgSrc} onChange={handleImageSourceChange} />
        </div>

        <div className="position">
          <p>Pos-X:</p>
          <input type="number" className="number-input" value={posX} onChange={handlePosXChange} />
          <p>Pos-Y:</p>
          <input type="number" className="number-input" value={posY} onChange={handlePosYChange} />
        </div>

        <div className="rotate">
          <p>Rotation:</p>
          <input type="range" className="range-slider" id="rotate-slider" min="-180" max="180" value={rotation} onChange={handleRotationChange} />
          <input type="number" className="number-input" id="rotate-input" value={rotation} onChange={handleRotationChange} />
        </div>

        <div className="scale">
          <p>Scale:</p>
          <input type="range" className="range-slider" id="scale-slider" min="5" max="200" value={scale} onChange={handleScaleChange} />
          <input type="number" className="number-input" id="scale-input" value={scale} onChange={handleScaleChange} />
        </div>

        <div className="opacity">
          <p>Opacity:</p>
          <input type="range" className="range-slider" id="opacity-slider" min="0" max="100" value={opacity} onChange={handleOpacityChange} />
          <input type="number" className="number-input" id="opacity-input" value={opacity} onChange={handleOpacityChange} />
        </div>

        <div className="zindex">
          <p>Z-Index:</p>
          <input type="number" className="number-input" value={zIndex} onChange={handleZIndexChange} />
        </div>

      </div>


    </div>
  )
}

export default MediaControls;