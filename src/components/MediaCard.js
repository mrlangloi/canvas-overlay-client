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

  const { id, element } = props;
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
      setCardClass("media-card");
    } 
  }, [element.visibility, element.id, activeElement]);


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
      element.posY = (elmnt.offsetTop - pos2) + "px";
      element.posX = (elmnt.offsetLeft - pos1) + "px";
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

  return (
    <div
      className={cardClass}
      id={element.id}
      ref={dragRef}
      style={{ 
        top: element.posY, 
        left: element.posX, 
        rotate: element.rotate, 
        scale: element.scale, 
        opacity: element.opacity, 
        zIndex: element.zIndex 
      }}
      onMouseDown={() => {setActiveElement(element)}}
    >
      <p className="media-text">{element.text}</p>
      <img src={element.src} style={{
        transform: `scale(${element.orientX}, ${element.orientY})`, 
      }} 
      width="" />
    </div>
  )
}

export default MediaCard;