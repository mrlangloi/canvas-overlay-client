import React, { useEffect, useRef, useState } from 'react';
import dragElement from '../utils/dragElement';

// every image/text/gif card on the page

function MediaCard() {

  const [imgURL, setImgURL] = useState("https://via.placeholder.com/150");
  const [text, setText] = useState("placeholder text");
  const dragRef = useRef(null);

  useEffect(() => {
    if (dragRef.current) {
      dragElement(dragRef.current);
    }
  }, []);

  return (
    <div className="media-card" ref={dragRef}>
      <p>{text}</p>
      <img src={imgURL} alt="placeholder" />
      <p>{text}</p>
    </div>
  )
}

export default MediaCard;