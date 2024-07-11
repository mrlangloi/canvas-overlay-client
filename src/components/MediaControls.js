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
    setText } = useContext(CardContext);

  const { addToList } = useContext(CardListContext);

  useEffect(() => {
    if (!activeElement) return;

    setImgSrc(activeElement.querySelector('img').src);
    setPosX(parseInt(activeElement.style.left));
    setPosY(parseInt(activeElement.style.top));
    setRotation(parseInt(activeElement.style.rotate));
    setScale(Math.round(parseFloat(activeElement.style.scale) * 100));
    setOpacity(Math.round(parseFloat(activeElement.style.opacity) * 100));
    setZIndex(parseInt(activeElement.style.zIndex));
    setText(activeElement.querySelector('p').textContent);

  }, [activeElement])

  function handleImageSourceChange(e) {
    setImgSrc(e.target.value);
    const imgElement = activeElement.querySelector('img');
    imgElement.src = e.target.value;
  }

  function handleTextChange(e) {
    setText(e.target.value);
    activeElement.querySelector('p').textContent = e.target.value;
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

  function handleReset(e) {
    setPosX(0);
    setPosY(0);
    setRotation(0);
    setScale(100);
    setOpacity(100);
    setZIndex(0);
    activeElement.style.top = `100px`;
    activeElement.style.left = `400px`;
    activeElement.style.rotate = `0deg`;
    activeElement.style.scale = `1`;
    activeElement.style.opacity = `1`;
    activeElement.style.zIndex = `0`;
  }

  function handleDelete(e) {
    // I'll work on this another time
    // activeElement.remove();
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

        <div className="flex-row">
          <button className="button" id="reset-button" onMouseUp={handleReset}>Reset</button>
          <button className="button" id="delete-button" onMouseUp={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default MediaControls;