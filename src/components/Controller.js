import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import Layers from './Layers';
import MediaControls from './MediaControls';
import TwitchLogin from './TwitchLogin';

// sidebar to adjust the properties of current media card

function Controller() {

  const { user, authorized, streamZIndex, setStreamZIndex } = useContext(UserContext);
  const [isControllerOpen, setIsControllerOpen] = useState(true);

  function toggleController() {
    setIsControllerOpen(!isControllerOpen);
  }

  function handleStreamInteract(e) {
    if (e.target.checked) {
      setStreamZIndex(1000);
    } else {
      setStreamZIndex(-1);
    }
  }


  return (
    <div className="controller streamer-mode">

      <i className={`fa fa-reorder fixed controller-icons ${isControllerOpen ? "controller-hidden" : "controller-show"}`} onClick={toggleController} />

      <div className={`controller-body ${isControllerOpen ? "controller-show" : "controller-hidden"}`}>

        <div className="controller-header flex-row">
          <TwitchLogin />
          <i className="fa fa-angle-double-left controller-icons" onClick={toggleController} />
        </div>

        <h1>Main Control</h1>

        <div className="stream-interact flex-row">
          <label htmlFor="toggle-stream-interact">Stream Interact</label>
          <input type="checkbox" id="toggle-stream-interact" checked={streamZIndex === -1 ? false : true} onChange={handleStreamInteract} />
        </div>

        {user ?

          (authorized ?
            <>
              <Layers />

              <MediaControls />
            </>
            :
            <p>User is not authorized to interact with overlay</p>
          )
          :
          null
        }

      </div>

    </div>
  )
}

export default Controller;