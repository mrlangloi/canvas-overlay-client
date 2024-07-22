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
    setActiveElement,
    setCardState,
  } = useContext(CardContext);

  const { emitEvent } = useContext(SocketContext);

  const [isEditing, setIsEditing] = useState(false);

  // const { addToList } = useContext(CardListContext);

  useEffect(() => {
    if (!activeElement) return;

    setCardState({
      name: activeElement.name,
      visibility: activeElement.visibility,
      src: activeElement.src,
      text: activeElement.text,
      fontSize: activeElement.fontSize,
      posX: activeElement.posX,
      posY: activeElement.posY,
      width: activeElement.width,
      height: activeElement.height,
      rotation: activeElement.rotation,
      opacity: activeElement.opacity,
      zIndex: activeElement.zIndex,
    });

  }, [activeElement, setCardState]);

  function editName() {
    if (isEditing) {
      return (
        <input
          type="text"
          id="media-name-input"
          name="name"
          value={activeElement.name}
          onChange={handleChange}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      )
    }
    else {
      return (
        <div className="flex-row">
          <p id="media-name">{`${activeElement.name}`}</p>
          <i className="fa fa-edit" id="media-name-edit" onClick={() => setIsEditing(true)} />
        </div>
      )
    }
  }

  /**
   * This function handle the changes to the media card properties
   * 
   * I tried doing:
   * function handleChange(e) {
   *   setCardState((prev) => ({...prev, [e.target.name]: e.target.value}));
   *   setActiveElement((prev) => ({...prev, [e.target.name]: e.target.value}));
   *   emitEvent("updateCard", activeElement);
   * }
   * but the active element on screen would not update
   * this is just a bandaid fix for now until I can figure out a better
   * solution.. or just leave it as it is..
   */
  function handleChange(e) {
    setCardState((prev) => ({...prev, [e.target.name]: e.target.value}));

    switch (e.target.name) {
      case "name":
        activeElement.name = e.target.value;
        break;
      case "image":
        activeElement.src = e.target.value;
        break;
      case "text":
        activeElement.text = e.target.value;
        break;
      case "fontSize":
        activeElement.fontSize = e.target.value;
        break;
      case "posX":
        activeElement.posX = e.target.value;
        break;
      case "posY":
        activeElement.posY = e.target.value;
        break;
      case "rotation":
        activeElement.rotation = e.target.value;
        break;
      case "width":
        activeElement.width = e.target.value;
        break;
      case "height":
        activeElement.height = e.target.value;
        break;
      case "orientX":
        if (e.target.checked) {
          activeElement.orientX = "-1";
        }
        else {
          activeElement.orientX = "1";
        }
        break;
      case "orientY":
        if (e.target.checked) {
          activeElement.orientY = "-1";
        }
        else {
          activeElement.orientY = "1";
        }
        break;
      case "opacity":
        activeElement.opacity = `${(e.target.value / 100)}`;
        break;
      case "zIndex":
        activeElement.zIndex = e.target.value;
        break;
      default:
        break;
    }

    emitEvent("updateCard", activeElement);
  }

  function handleReset(e) {
    setActiveElement((prev) => ({...prev,
      isVisible: "hidden",
      posX: "400",
      posY: "100",
      rotation: "0",
      width: "-1",
      height: "-1",
      orientX: "1",
      orientY: "1",
      opacity: "100",
      zIndex: "10",
    }));
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
          <input type="text" className="text-input" id="image-source-input" name="src" value={activeElement.src} placeholder="Insert Image URL.." onChange={handleChange} />
        </div>

        <div>
          <textarea type="text" id="inner-text-input" name="text" value={activeElement.text} placeholder="Insert Text.." onChange={handleChange} />
          <div className="flex-row">
            <p>Font Size:</p>
            <input type="number" className="number-input" name="fontSize" value={activeElement.fontSize} onChange={handleChange} />
          </div>
        </div>

        <div className="position flex-row">
          <p>Pos-X:</p>
          <input type="number" className="number-input" name="posX" value={activeElement.posX} onChange={handleChange} />
          <p>Pos-Y:</p>
          <input type="number" className="number-input" name="posY" value={activeElement.posY} onChange={handleChange} />
        </div>

        <Slider
          name="rotation"
          minValue="-180"
          maxValue="180"
          value={activeElement.rotation}
          handleChange={handleChange}
        />

        <div className="position flex-row">
          <Slider
            name="width"
            minValue="1"
            maxValue="1280"
            value={activeElement.width}
            handleChange={handleChange}
          />
          <p>Height:</p>
          <input type="number" className="number-input" name="height" value={activeElement.height} onChange={handleChange} />
        </div>

        <div className="flip flex-row">
          <div className="flex-column">
            <p>Flip:</p>
            <div className="flex-row">
              <label htmlFor="horiz-checkbox">Horizontal</label>
              <input type="checkbox" className="checkbox" id="horiz-checkbox" name="orientX" checked={activeElement.orientX === "-1" ? true : false} onChange={handleChange} />
              <label htmlFor="vert-checkbox">Vertical</label>
              <input type="checkbox" className="checkbox" id="vert-checkbox" name="orientY" checked={activeElement.orientY === "-1" ? true : false} onChange={handleChange} />
            </div>
          </div>
        </div>

        <Slider
          name="opacity"
          minValue="0"
          maxValue="100"
          value={activeElement.opacity * 100}
          handleChange={handleChange}
        />

        <div className="zindex flex-row">
          <p>Z-Index:</p>
          <input type="number" className="number-input" name="zIndex" value={activeElement.zIndex} onChange={handleChange} />
        </div>

        <button className="button" id="reset-button" name="reset" onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default MediaControls;