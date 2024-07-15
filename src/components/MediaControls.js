import React, { useContext, useEffect, useState } from 'react';
import { CardContext } from '../contexts/CardContext';
import Slider from './Slider';
 
// settings to fine-tune the properties of the media card

/**
 * i could create a setting to change the width and height of the media card
 * rather than relying on scale
 * 
 * i need to move the toggle visibility to the layer.js component to
 * reduce clutter and make it easier to see which card is being adjusted
 */

function MediaControls() {

  const { 
    activeElement,
    name,
    setName,
    isVisible,
    setIsVisible,
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
    orientX,
    setOrientX,
    orientY,
    setOrientY,
    opacity,
    setOpacity,
    zIndex,
    setZIndex,
  } = useContext(CardContext);

  const [isEditing, setIsEditing] = useState(false);

  // const { addToList } = useContext(CardListContext);

  useEffect(() => {
    if (!activeElement) return;

    setName(activeElement.name);
    setIsVisible(activeElement.visibility === "visible" ? true : false);
    setImgSrc(activeElement.src);
    setPosX(parseInt(activeElement.posX));
    setPosY(parseInt(activeElement.posY));
    setRotation(parseInt(activeElement.rotate));
    setScale(Math.round(parseFloat(activeElement.scale) * 100));
    setOrientX(parseInt(activeElement.orientX));
    setOrientY(parseInt(activeElement.orientY));
    setOpacity(Math.round(parseFloat(activeElement.opacity) * 100));
    setZIndex(parseInt(activeElement.zIndex));
    setText(activeElement.text);

  }, [activeElement, setIsVisible, setImgSrc, setPosX, setPosY, setRotation, setScale, setOrientX, setOrientY, setOpacity, setZIndex, setText])

  function editName() {
    if (isEditing) {
      return (
      <input 
        type="text" 
        value={activeElement.name} 
        onChange={handleNameChange} 
        onBlur={() => setIsEditing(false)} 
        autoFocus
      />
    )}
    else {
      return (
        <p onMouseUp={() => setIsEditing(true)} >{`${activeElement.name}`}</p>
      )
    }
  }

  function handleNameChange(e) {
    setName(e.target.value);
    activeElement.name = e.target.value;
  }

  function handleVisibilityChange(e) {
    if (e.target.checked) {
      setIsVisible(true);
      activeElement.visibility = "visible";
    }
    else {
      setIsVisible(false);
      activeElement.visibility = "hidden";
    }
  }

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

  function handleHorizFlip(e) {
    if (e.target.checked) {
      setOrientX(-1);
      activeElement.orientX = -1;
    }
    else {
      setOrientX(1);
      activeElement.orientX = 1;
    }
  }

  function handleVertFlip(e) {
    if (e.target.checked) {
      setOrientY(-1);
      activeElement.orientY = -1;
    }
    else {
      setOrientY(1);
      activeElement.orientY = 1;
    }
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
    setIsVisible(false);
    setPosX(0);
    setPosY(0);
    setRotation(0);
    setScale(100);
    setOrientX(1);
    setOrientY(1);
    setOpacity(100);
    setZIndex(1);
    activeElement.visibility = "hidden";
    activeElement.posY = `100px`;
    activeElement.posX = `400px`;
    activeElement.rotate = `0deg`;
    activeElement.scale = 1;
    activeElement.orientX = 1;
    activeElement.orientY = 1;
    activeElement.opacity = 1;
    activeElement.zIndex = 1;
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
        {editName()}
      </div>

      <div className="media-control-body flex-column">

        <div className="flex-row">
          <label htmlFor="visibility-checkbox">Display</label>
          <input type="checkbox" className="checkbox" id="visibility-checkbox" checked={isVisible} onChange={handleVisibilityChange} />
        </div>

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

        <Slider 
          name="Rotation"
          minValue="-180"
          maxValue="180"
          value={rotation}
          handleFunction={handleRotationChange}
        />

        <Slider
          name="Scale"
          minValue="5"
          maxValue="200"
          value={scale}
          handleFunction={handleScaleChange}
        />

        <div className="flip flex-row">
          <div className="flex-column">
            <p>Flip:</p>
            <div className="flex-row">
              <label htmlFor="horiz-checkbox">Horizontal</label>
              <input type="checkbox" className="checkbox" id="horiz-checkbox" checked={orientX === -1 ? true : false} onChange={handleHorizFlip} />
              <label htmlFor="vert-checkbox">Vertical</label>
              <input type="checkbox" className="checkbox" id="vert-checkbox" checked={orientY === -1 ? true : false} onChange={handleVertFlip} />
            </div>
          </div>
        </div>

        <Slider
          name="Opacity"
          minValue="0"
          maxValue="100"
          value={opacity}
          handleFunction={handleOpacityChange}
        />

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