import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CardContext } from '../contexts/CardContext';
import { SocketContext } from '../contexts/SocketContext';
import { UserContext } from '../contexts/UserContext';
import { updateMediaCard } from '../utils/apiHandles';

// every image/text/gif card on the page

function MediaCard(props) {

  const { activeElement,
    setActiveElement,
    setCardState,
  } = useContext(CardContext);

  const { element } = props;
  const { emitEvent } = useContext(SocketContext);
  const { authorized } = useContext(UserContext)


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
  const videoExtensions = useMemo(() => [".mp4", ".webm", ".mov", ".avi"], []);
  const isVideo = videoExtensions.some(ext => element.src.includes(ext))

  const dragRef = useRef(null);

  // source: https://www.w3schools.com/howto/howto_js_draggable.asp
  // makes the element draggable with a few edits to the source code
  const dragElement = useCallback((elmnt) => {

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    function dragMouseDown(e) {
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
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.posY = `${elmnt.offsetTop - pos2}`;
      element.posX = `${elmnt.offsetLeft - pos1}`;
      setCardState((prev) => ({
        ...prev,
        posX: element.posX,
        posY: element.posY
      }));
      emitEvent('updateCard', element);
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      updateMediaCard(element);
      document.onmouseup = null;
      document.onmousemove = null;
    }

    elmnt.onmousedown = dragMouseDown;

  }, [element, setCardState, emitEvent]);


/**
 * when the component mounts, make the element draggable
 * 
 * for some reason, when 'element' is not in the list of dependencies,
 * the other draggable elements bug out when I remove one of them.
 * adding element to the list of dependencies fixes the bug??
 * idk why but it works
 */
  useEffect(() => {
    if (authorized && dragRef.current) {
      dragElement(dragRef.current);
    }
  }, [authorized, dragElement]);




  const mediaStyle = useMemo(() => ({
    transform: `scale(${element.orientX}, ${element.orientY})`,
    width: element.width === "-1" ? "auto" : `${element.width}px`,
    height: element.height === "-1" ? "auto" : `${element.height}px`,
    display: element.src === "" ? "none" : "block",
  }), [element.orientX, element.orientY, element.width, element.height, element.src]);

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
        transform: `rotate(${element.rotation}deg)`,
        opacity: element.opacity,
        zIndex: element.zIndex
      }}
      onMouseDown={() => setActiveElement(element)}
    >
      {element.text !== "" ? <p className="media-text" style={{ fontFamily: `${element.fontFamily}, sans-serif`, color: `${element.color}`, fontSize: `${element.fontSize}px` }}>{element.text}</p> : null}
      {isVideo ?
        <video src={element.src} style={mediaStyle} autoPlay loop muted />
        :
        <img src={element.src} alt="" style={mediaStyle} />
      }

    </div>
  )
}

export default memo(MediaCard);