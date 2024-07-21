import React, { useContext, useEffect, useState } from 'react';
import { CardContext } from '../contexts/CardContext';
import { SocketContext } from '../contexts/SocketContext';
import Slider from './Slider';

// settings to fine-tune the properties of the media card

/**
 * i could create a setting to change the width and height of the media card
 * rather than relying on scale
 * 
 */

function MediaControls() {

  const {
    activeElement,
    name,
    setName,
    setIsVisible,
    imgSrc,
    setImgSrc,
    text,
    setText,
    fontSize,
    setFontSize,
    posX,
    setPosX,
    posY,
    setPosY,
    rotation,
    setRotation,
    width,
    setWidth,
    height,
    setHeight,
    orientX,
    setOrientX,
    orientY,
    setOrientY,
    opacity,
    setOpacity,
    zIndex,
    setZIndex,
  } = useContext(CardContext);

  const { emitEvent } = useContext(SocketContext);

  const [isEditing, setIsEditing] = useState(false);

  // const { addToList } = useContext(CardListContext);

  useEffect(() => {
    if (!activeElement) return;

    setName(activeElement.name);
    setIsVisible(activeElement.visibility === "visible" ? true : false);
    setImgSrc(activeElement.src);
    setPosX(activeElement.posX);
    setPosY(activeElement.posY);
    setRotation(activeElement.rotate);
    setWidth(activeElement.width);
    setHeight(activeElement.height);
    setOrientX(activeElement.orientX);
    setOrientY(activeElement.orientY);
    setOpacity(parseFloat(activeElement.opacity) * 100);
    setZIndex(activeElement.zIndex);
    setText(activeElement.text);

  }, [activeElement, setName, setIsVisible, setImgSrc, setPosX, setPosY, setRotation, setWidth, setHeight, setOrientX, setOrientY, setOpacity, setZIndex, setText])

  function editName() {
    if (isEditing) {
      return (
        <input
          type="text"
          id="media-name-input"
          value={name}
          onChange={(e) => handleChange(e, "name")}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      )
    }
    else {
      return (
        <div className="flex-row">
          <p id="media-name">{`${name}`}</p>
          <i className="fa fa-edit" id="media-name-edit" onMouseUp={() => setIsEditing(true)} />
        </div>
      )
    }
  }

  function handleChange(e, property) {
    switch (property) {
      case "name":
        setName(e.target.value);
        activeElement.name = e.target.value;
        break;
      case "image":
        setImgSrc(e.target.value);
        activeElement.src = e.target.value;
        break;
      case "text":
        setText(e.target.value);
        activeElement.text = e.target.value;
        break;
      case "fontSize":
        setFontSize(e.target.value);
        activeElement.fontSize = e.target.value;
        break;
      case "posX":
        setPosX(e.target.value);
        activeElement.posX = e.target.value;
        break;
      case "posY":
        setPosY(e.target.value);
        activeElement.posY = e.target.value;
        break;
      case "rotation":
        setRotation(e.target.value);
        activeElement.rotate = e.target.value;
        break;
      case "width":
        setWidth(e.target.value);
        activeElement.width = e.target.value;
        break;
      case "height":
        setHeight(e.target.value);
        activeElement.height = e.target.value;
        break;
      case "orientX":
        if (e.target.checked) {
          setOrientX(-1);
          activeElement.orientX = -1;
        }
        else {
          setOrientX(1);
          activeElement.orientX = 1;
        }
        break;
      case "orientY":
        if (e.target.checked) {
          setOrientY(-1);
          activeElement.orientY = -1;
        }
        else {
          setOrientY(1);
          activeElement.orientY = 1;
        }
        break;
      case "opacity":
        setOpacity(e.target.value);
        activeElement.opacity = (e.target.value / 100);
        break;
      case "zIndex":
        setZIndex(e.target.value);
        activeElement.zIndex = e.target.value;
        break;
      case "reset":
        setIsVisible(false);
        setPosX(0);
        setPosY(0);
        setRotation(0);
        setOrientX(1);
        setOrientY(1);
        setOpacity(100);
        setZIndex(1);
        activeElement.visibility = "hidden";
        activeElement.posY = 100;
        activeElement.posX = 400;
        activeElement.rotate = 0;
        activeElement.orientX = 1;
        activeElement.orientY = 1;
        activeElement.opacity = 1;
        activeElement.zIndex = 1;
        break;
      default:
        break;
    }

    emitEvent("updateCard", activeElement);
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

        <div className="imageSource">
          <input type="text" className="text-input" id="image-source-input" value={imgSrc} placeholder="Insert Image URL.." onChange={(e) => handleChange(e, "image")} />
        </div>

        <div>
          <textarea type="text" id="inner-text-input" value={text} placeholder="Insert Text.." onChange={(e) => handleChange(e, "text")} />
          <div className="flex-row">
            <p>Font Size:</p>
            <input type="number" className="number-input" value={fontSize} onChange={(e) => handleChange(e, "fontSize")} />
          </div>
        </div>

        <div className="position flex-row">
          <p>Pos-X:</p>
          <input type="number" className="number-input" value={posX} onChange={(e) => handleChange(e, "posX")} />
          <p>Pos-Y:</p>
          <input type="number" className="number-input" value={posY} onChange={(e) => handleChange(e, "posY")} />
        </div>

        <Slider
          name="Rotation"
          minValue="-180"
          maxValue="180"
          value={rotation}
          handleFunction={(e) => handleChange(e, "rotation")}
        />

        <div className="position flex-row">
          <Slider
            name="Width"
            minValue="1"
            maxValue="1280"
            value={width}
            handleFunction={(e) => handleChange(e, "width")}
          />
          <p>Height:</p>
          <input type="number" className="number-input" value={height} onChange={(e) => handleChange(e, "height")} />
        </div>

        <div className="flip flex-row">
          <div className="flex-column">
            <p>Flip:</p>
            <div className="flex-row">
              <label htmlFor="horiz-checkbox">Horizontal</label>
              <input type="checkbox" className="checkbox" id="horiz-checkbox" checked={orientX === -1 ? true : false} onChange={(e) => handleChange(e, "orientX")} />
              <label htmlFor="vert-checkbox">Vertical</label>
              <input type="checkbox" className="checkbox" id="vert-checkbox" checked={orientY === -1 ? true : false} onChange={(e) => handleChange(e, "orientY")} />
            </div>
          </div>
        </div>

        <Slider
          name="Opacity"
          minValue="0"
          maxValue="100"
          value={opacity}
          handleFunction={(e) => handleChange(e, "opacity")}
        />

        <div className="zindex flex-row">
          <p>Z-Index:</p>
          <input type="number" className="number-input" value={zIndex} onChange={(e) => handleChange(e, "zIndex")} />
        </div>

        <button className="button" id="reset-button" onMouseUp={(e) => handleChange(e, "reset")}>Reset</button>
      </div>
    </div>
  )
}

export default MediaControls;