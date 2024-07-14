import React, { useContext, useEffect } from 'react';
import { CardContext } from '../contexts/CardContext';
import { CardListContext } from '../contexts/CardListContext';

// settings to fine-tune the properties of the media card

function MediaControls() {

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
    text,
    setText
  } = useContext(CardContext);

  const { addToList } = useContext(CardListContext);

  useEffect(() => {
    if (!activeElement) return;

    setImgSrc(activeElement.src);
    setPosX(parseInt(activeElement.posX));
    setPosY(parseInt(activeElement.posY));
    setRotation(parseInt(activeElement.rotate));
    setScale(Math.round(parseFloat(activeElement.scale) * 100));
    setOpacity(Math.round(parseFloat(activeElement.opacity) * 100));
    setZIndex(parseInt(activeElement.zIndex));
    setText(activeElement.text);

  }, [activeElement])

  function handleImageSourceChange(e) {
    setImgSrc(e.target.value);
    activeElement.src = e.target.value;
  }

  function handleTextChange(e) {
    setText(e.target.value);
    activeElement.text = e.target.value;
  }

  function handlePosXChange(e) {
    setPosX(e.target.value);
    activeElement.posX = `${e.target.value}px`;
  }

  function handlePosYChange(e) {
    setPosY(e.target.value);
    activeElement.posY = `${e.target.value}px`;
  }

  function handleRotationChange(e) {
    setRotation(e.target.value);
    activeElement.rotate = `${e.target.value}deg`;
  }

  function handleScaleChange(e) {
    setScale(e.target.value);
    activeElement.scale = `${e.target.value / 100}`;
  }

  function handleOpacityChange(e) {
    setOpacity(e.target.value);
    activeElement.opacity = `${e.target.value / 100}`;
  }

  function handleZIndexChange(e) {
    setZIndex(e.target.value);
    activeElement.zIndex = e.target.value;
  }

  function handleReset(e) {
    setPosX(0);
    setPosY(0);
    setRotation(0);
    setScale(100);
    setOpacity(100);
    setZIndex(0);
    activeElement.posY = `100px`;
    activeElement.posX = `400px`;
    activeElement.rotate = `0deg`;
    activeElement.scale = `1`;
    activeElement.opacity = `1`;
    activeElement.zIndex = `0`;
  }

  if (!activeElement) {
    return (
      <div className="media-control">
        <div className="media-control-header flex-column">
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
      <div className="media-control-header flex-column">
        <p>{activeElement.id}</p>
      </div>

      <div className="media-control-body flex-column">
        <div className="imageSource">
          <input type="text" className="text-input" id="image-source-input" value={activeElement.src} onChange={handleImageSourceChange} />
        </div>

        <div>
          <input type="text" id="inner-text-input" value={activeElement.text} onChange={handleTextChange} />
        </div>

        <div className="position flex-row">
          <p>Pos-X:</p>
          <input type="number" className="number-input" value={parseInt(activeElement.posX)} onChange={handlePosXChange} />
          <p>Pos-Y:</p>
          <input type="number" className="number-input" value={parseInt(activeElement.posY)} onChange={handlePosYChange} />
        </div>

        <div className="rotate flex-row">
          <p>Rotation:</p>
          <input type="number" className="number-input" id="rotate-input" value={parseInt(activeElement.rotate)} onChange={handleRotationChange} />
          <input type="range" className="range-slider" id="rotate-slider" min="-180" max="180" value={parseInt(activeElement.rotate)} onChange={handleRotationChange} />
          
        </div>

        <div className="scale flex-row">
          <p>Scale:</p>
          <input type="number" className="number-input" id="scale-input" value={activeElement.scale * 100} onChange={handleScaleChange} />
          <input type="range" className="range-slider" id="scale-slider" min="5" max="200" value={activeElement.scale * 100} onChange={handleScaleChange} />
        </div>

        <div className="opacity flex-row">
          <p>Opacity:</p>
          <input type="number" className="number-input" id="opacity-input" value={(activeElement.opacity * 100)} onChange={handleOpacityChange} />
          <input type="range" className="range-slider" id="opacity-slider" min="0" max="100" value={(activeElement.opacity * 100)} onChange={handleOpacityChange} />
        </div>

        <div className="zindex flex-row">
          <p>Z-Index:</p>
          <input type="number" className="number-input" value={activeElement.zIndex} onChange={handleZIndexChange} />
        </div>

        <button className="button" id="reset-button" onMouseUp={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default MediaControls;