import React, { useEffect, useRef } from 'react';


// every image/text/gif card on the page

function MediaCard(props) {

  const { id, addToRefs, activeElement, setActiveElement, setPosX, setPosY, zIndex } = props;

  const text = "placeholder text";
  const imgSrc = "https://via.placeholder.com/150";

  const dragRef = useRef(null);

  // source: https://www.w3schools.com/howto/howto_js_draggable.asp
  // makes the element draggable
  function dragElement(element) {

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
    element.onmousedown = dragMouseDown;
  
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
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
      setPosX(element.offsetLeft - pos1);
      setPosY(element.offsetTop - pos2);
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // when the component mounts, make the element draggable, add it to the list of references, and set it as the active element
  useEffect(() => {
    if (dragRef.current) {
      dragElement(dragRef.current);
      addToRefs(dragRef.current);
      setActiveElement(dragRef.current);
    }
  }, []);

  return (
    <div 
      className={activeElement === dragRef.current ? "media-card active" : "media-card"} 
      id={id}
      ref={dragRef} 
      style={{top: `100px`, left: `400px`, rotate: `0deg`, scale: `1`, opacity: `100`, zIndex: `0`}}
      onMouseDown={() => {setActiveElement(dragRef.current); console.log(dragRef.current)}}
    >
      <p>{text}</p>
      <img src={imgSrc} alt="placeholder" width="200" />
      <p>{text}</p>
    </div>
  )
}

export default MediaCard;