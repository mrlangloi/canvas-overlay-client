import React from "react";

// settings to fine-tune the properties of the media card

function MediaControl(media) {
  const { type, name, url, text } = media;

  return (
    <div className="media-control">
      <div className="media-control-header">
        <p>{name}</p>
      </div>
      
      <div className="media-control-body">
        <div className="media-control-body-pos">
          <p>Pos-X:</p>
          <input type="number" value="0" id="posx-number" />
          <p>Pos-Y:</p>
          <input type="number" value="0" id="posy-number" />
        </div>

        <div className="media-control-body-scale">
          <p>Scale:</p>
          <input type="range" min="1" max="100" value="50" id="scale-slider" />
        </div>

        <div className="media-control-body-rotate">
          <p>Rotation:</p>
          <input type="range" min="-180" max="180" value="0" id="rotate-slider" />
        </div>

        <div className="media-control-body-opacity">
          <p>Opacity:</p>
          <input type="range" min="0" max="100" value="100" id="opacity-slider" />
        </div>

        <div className="media-control-body-zindex">
          <p>Z-Index:</p>

        </div>

      </div>
    </div>
  )
}

export default MediaControl;