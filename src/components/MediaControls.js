import React, { useCallback, useContext, useState } from 'react';
import { CardContext } from '../contexts/CardContext';
import { SocketContext } from '../contexts/SocketContext';
import { updateMediaCard } from '../utils/apiHandles';
import { updateCardState } from '../utils/controlHandles';
import Slider from './Slider';

// settings to fine-tune the properties of the media card

function MediaControls() {

  const {
    activeElement,
    setCardState,
  } = useContext(CardContext)

  const { emitEvent } = useContext(SocketContext)

  const [isEditing, setIsEditing] = useState(false)

  // this function handle the changes to the media card properties
  const handleChange = useCallback((e) => {
    if (e.target.name === "orientX" || e.target.name === "orientY") {
      setCardState((prev) => ({...prev, [e.target.name]: e.target.checked}))
      updateCardState(activeElement, e.target.name, e.target.checked)
    }
    else {
      setCardState((prev) => ({...prev, [e.target.name]: e.target.value}))
      updateCardState(activeElement, e.target.name, e.target.value)
    }

    updateMediaCard(activeElement)
    emitEvent("updateCard", activeElement)
  }, [activeElement, setCardState, emitEvent])

  const handleReset = useCallback(() => {
    activeElement.visibility = "hidden"
    activeElement.posX = "400"
    activeElement.posY = "100"
    activeElement.width = "-1"
    activeElement.height = "-1"
    activeElement.rotation = "0"
    activeElement.orientX = "1"
    activeElement.orientY = "1"
    activeElement.opacity = "1"
    activeElement.zIndex = "10"

    setCardState((prev) => ({...prev, 
      visibility: "hidden",
      posX: "400",
      posY: "100",
      width: "-1",
      height: "-1",
      rotation: "0",
      orientX: "1",
      orientY: "1",
      opacity: "1",
      zIndex: "10",
    }))

    updateMediaCard(activeElement)
  }, [activeElement, setCardState])


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
        {isEditing ?
          <input
            type="text"
            id="media-name-input"
            name="name"
            value={activeElement.name}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            autoFocus
          /> :
          <div className="flex-row">
            <p id="media-name">{`${activeElement.name}`}</p>
            <i className="fa fa-edit" id="media-name-edit" onClick={() => setIsEditing(true)} />
          </div>
        }
      </div>

      <div className="media-control-body flex-column">

        <div className="imageSource">
          <input type="text" className="text-input" id="image-source-input" name="src" value={activeElement.src} placeholder="Insert Image URL.." onChange={handleChange} />
        </div>

        <>
          <textarea type="text" id="inner-text-input" name="text" value={activeElement.text} placeholder="Insert Text.." onChange={handleChange} />
          <div className="flex-row">
            <p>Font Size:</p>
            <input type="number" className="number-input" name="fontSize" value={activeElement.fontSize} onChange={handleChange} />
            <input type="color" className="color-input" name="color" value={activeElement.color} onChange={handleChange} />
          </div>
        </>

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
          value={parseInt(activeElement.opacity * 100)}
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