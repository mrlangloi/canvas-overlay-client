import React, { useContext, useEffect, useRef } from 'react';
import { CardContext } from '../contexts/CardContext';

// every image/text/gif card on the page

function MediaCard(props) {

  const { activeElement,
    setActiveElement,
    setPosX,
    setPosY,
  } = useContext(CardContext);

  const { id, element } = props;

  const dragRef = useRef(null);

  // when the component mounts, make the element draggable, add it to the list of references, and set it as the active element
  useEffect(() => {
    if (dragRef.current) {
      dragElement(dragRef.current);
      setActiveElement(element);
    }
  }, []);

  // source: https://www.w3schools.com/howto/howto_js_draggable.asp
  // makes the element draggable
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
      // set the element's new position:
      // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      element.posY = (elmnt.offsetTop - pos2) + "px";
      element.posX = (elmnt.offsetLeft - pos1) + "px";
      setPosX(elmnt.offsetLeft - pos1);
      setPosY(elmnt.offsetTop - pos2);
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  return (
    <div
      className={activeElement === element ? "media-card active" : "media-card"}
      id={id}
      ref={dragRef}
      style={{ top: element.posY, left: element.posX, rotate: element.rotate, scale: element.scale, opacity: element.opacity, zIndex: element.zIndex }}
      onMouseDown={() => {setActiveElement(element)}}
    >
      <p className="media-text">{element.text}</p>
      <img src={element.src} width="" />
    </div>
  )
}

export default MediaCard;