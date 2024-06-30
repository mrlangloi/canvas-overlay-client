
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
  } = props;

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


  // if (!activeElement) {
  //   return (
  //     <div className="media-control">
  //       <div className="media-control-header">
  //         <p>Media Control</p>
  //       </div>

  //       <div className="media-control-body">
  //         <p>Select a media card to adjust its properties</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="media-control">
      <div className="media-control-header">
        {/* <p>{name}</p> */}
      </div>

      <div className="media-control-body">
        <div className="media-control-body-pos">
          <p>Pos-X:</p>
          <input type="number" value={posX} className="number-input" onChange={handlePosXChange} />
          <p>Pos-Y:</p>
          <input type="number" value={posY} className="number-input" onChange={handlePosYChange} />
        </div>

        <div className="media-control-body-rotate">
          <p>Rotation:</p>
          <input type="range" min="-180" max="180" value={rotation} id="rotate-slider" onChange={handleRotationChange} />
          <input type="number" value={rotation} id="rotate-input" onChange={handleRotationChange} />
        </div>

        {/* <div className="media-control-body-scale">
          <p>Scale:</p>
          <input type="range" min="1" max="200" value={element.scale * 100 || "100"} id="scale-slider" />
        </div>

        <div className="media-control-body-opacity">
          <p>Opacity:</p>
          <input type="range" min="0" max="100" value={element.opacity || "100"} id="opacity-slider" />
        </div>

        <div className="media-control-body-zindex">
          <p>Z-Index:</p>
          <input type="number" value={element.zindex || "0"} className="number-input" />
        </div> */}

      </div>


    </div>
  )
}

export default MediaControls;