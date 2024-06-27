import React, { useState } from 'react';

function MediaCard() {

  const [imgURL, setImgURL] = useState("https://via.placeholder.com/150");
  const [text, setText] = useState("placeholder text");

  return (
    <div className="media-card">
      <p>{text}</p>
      <img src={imgURL} alt="placeholder" />
      <p>{text}</p>
    </div>
  )
}

export default MediaCard;