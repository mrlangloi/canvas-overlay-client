import React, { useContext, useEffect, useRef, useState } from 'react';
import { CardContext } from '../contexts/CardContext';
import { SocketContext } from '../contexts/SocketContext';

// every image/text/gif card on the page

function MediaCard(props) {

  const { activeElement,
    setActiveElement,
    setPosX,
    setPosY,
  } = useContext(CardContext);

  const { element } = props;
  const { emitEvent } = useContext(SocketContext);


  /**
   * keeping track of the class of the card to change its appearance
   * when it is the active element or when it is hidden
   */
  const [cardClass, setCardClass] = useState("media-card");

  useEffect(() => {
    if (activeElement && activeElement.id === element.id) {
      if (element.visibility === "hidden") {
        setCardClass("media-card hidden-card");
      }
      else {
        setCardClass("media-card active-card");
      }
    }
    else {
      if (element.visibility === "hidden") {
        setCardClass("media-card streamer-mode");
      }
      else {
        setCardClass("media-card");
      }
    }
  }, [element.visibility, element.id, activeElement]);


  /**
   * tenor gifs are mp4 files, so we need to check if the src is a video
   * to render the correct element
   */
  const videoExtensions = [".mp4", ".webm", ".mov", ".avi"];
  const isVideo = videoExtensions.some(ext => element.src.includes(ext));

  /**
   * when the component mounts, make the element draggable
   * 
   * for some reason, when 'element' is not in the list of dependencies,
   * the other draggable elements bug out when I remove one of them.
   * adding element to the list of dependencies fixes the bug??
   * idk why but it works
   */
  const dragRef = useRef(null);

  useEffect(() => {
    if (dragRef.current) {
      dragElement(dragRef.current);
    }
  }, [element]);

  // source: https://www.w3schools.com/howto/howto_js_draggable.asp
  // makes the element draggable with a few edits to the source code
  function dragElement(elmnt) {

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {

      console.log(element);

      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.posY = (elmnt.offsetTop - pos2);
      element.posX = (elmnt.offsetLeft - pos1);
      setPosX(elmnt.offsetLeft - pos1);
      setPosY(elmnt.offsetTop - pos2);
      emitEvent('updateCard', element);
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  const mediaStyle = {
    transform: `scale(${element.orientX}, ${element.orientY})`,
    width: element.width === -1 ? "auto" : `${element.width}px`,
    height: element.height === -1 ? "auto" : `${element.height}px`,
    display: element.src === "" ? "none" : "block",
  }

  // obs doesn't render "rotate: element.rotate" at all
  // so I have to use transform: rotate() instead

  return (
    <div
      className={cardClass}
      id={element.id}
      ref={dragRef}
      style={{
        top: `${element.posY}px`,
        left: `${element.posX}px`,
        transform: `rotate(${element.rotate}deg)`,
        opacity: element.opacity,
        zIndex: element.zIndex
      }}
      onMouseDown={() => setActiveElement(element)}
    >
      <p className="media-text">{element.text}</p>
      {isVideo ? 
        <video src={element.src} style={mediaStyle} autoPlay loop muted /> 
        :
        <img src={element.src} style={mediaStyle} />
      }

    </div>
  )
}

export default MediaCard;