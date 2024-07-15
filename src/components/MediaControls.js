import React, { useContext, useEffect } from 'react';
import { CardContext } from '../contexts/CardContext';
 
// settings to fine-tune the properties of the media card

/**
 * i could create a setting to change the width and height of the media card
 * rather than relying on scale
 * 
 * i could also add a setting to flip the media card horizontally or vertically
 */

function MediaControls() {

  const { 
    activeElement,
    imgSrc,
    setImgSrc,
    text,
    setText,
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
  } = useContext(CardContext);

  // const { addToList } = useContext(CardListContext);

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

  }, [activeElement, setImgSrc, setPosX, setPosY, setRotation, setScale, setOpacity, setZIndex, setText])

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
    if (e.target.value < 1) {
      e.target.value = 1;
    }
    setZIndex(e.target.value);
    activeElement.zIndex = e.target.value;
  }

  function handleReset(e) {
    setPosX(0);
    setPosY(0);
    setRotation(0);
    setScale(100);
    setOpacity(100);
    setZIndex(1);
    activeElement.posY = `100px`;
    activeElement.posX = `400px`;
    activeElement.rotate = `0deg`;
    activeElement.scale = `1`;
    activeElement.opacity = `1`;
    activeElement.zIndex = `1`;
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
        <p>{activeElement.name}</p>
      </div>

      <div className="media-control-body flex-column">
        <div className="imageSource">
          <input type="text" className="text-input" id="image-source-input" value={imgSrc} onChange={handleImageSourceChange} />
        </div>

        <div>
          <input type="text" id="inner-text-input" value={text} onChange={handleTextChange} />
        </div>

        <div className="position flex-row">
          <p>Pos-X:</p>
          <input type="number" className="number-input" value={posX} onChange={handlePosXChange} />
          <p>Pos-Y:</p>
          <input type="number" className="number-input" value={posY} onChange={handlePosYChange} />
        </div>

        <div className="rotate flex-row">
          <p>Rotation:</p>
          <input type="number" className="number-input" id="rotate-input" value={rotation} onChange={handleRotationChange} />
          <input type="range" className="range-slider" id="rotate-slider" min="-180" max="180" value={rotation} onChange={handleRotationChange} />
          
        </div>

        <div className="scale flex-row">
          <p>Scale:</p>
          <input type="number" className="number-input" id="scale-input" value={scale} onChange={handleScaleChange} />
          <input type="range" className="range-slider" id="scale-slider" min="5" max="200" value={scale} onChange={handleScaleChange} />
        </div>

        <div className="opacity flex-row">
          <p>Opacity:</p>
          <input type="number" className="number-input" id="opacity-input" value={opacity} onChange={handleOpacityChange} />
          <input type="range" className="range-slider" id="opacity-slider" min="0" max="100" value={opacity} onChange={handleOpacityChange} />
        </div>

        <div className="zindex flex-row">
          <p>Z-Index:</p>
          <input type="number" className="number-input" value={zIndex} onChange={handleZIndexChange} />
        </div>

        <button className="button" id="reset-button" onMouseUp={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default MediaControls;