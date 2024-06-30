import React, { useEffect, useRef } from 'react';


// every image/text/gif card on the page

function MediaCard(props) {

  const { id, addToRefs, setActiveElement, setPosX, setPosY } = props;

  const src = "https://via.placeholder.com/150";
  const text = "placeholder text";

  const dragRef = useRef(null);

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


  useEffect(() => {
    if (dragRef.current) {
      dragElement(dragRef.current);
      addToRefs(dragRef.current);
      setActiveElement(dragRef.current);
    }
  }, []);

  return (
    <div 
      className="media-card" 
      id={id}
      ref={dragRef} 
      style={{top: `0px`, left: `0px`, rotate: `0deg`}}
      onMouseDown={() => {setActiveElement(dragRef.current); console.log(dragRef.current)}}
    >
      <p>{text}</p>
      <img src={src} alt="placeholder" />
      <p>{text}</p>
    </div>
  )
}

export default MediaCard;