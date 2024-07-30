import React, { useContext, useState } from 'react';
import { StreamContext } from '../contexts/StreamContext';
import { UserContext } from '../contexts/UserContext';
import Layers from './Layers';
import MediaControls from './MediaControls';
import TwitchLogin from './TwitchLogin';

// sidebar to adjust the properties of current media card

function Controller() {

  const { streamZIndex, setStreamZIndex } = useContext(StreamContext)
  const { user, authorized } = useContext(UserContext);
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

      <i className={`fa fa-reorder absolute controller-icons ${isControllerOpen ? "controller-hidden" : "controller-show"}`} onClick={toggleController} />

      <div className={`controller-body ${isControllerOpen ? "controller-show" : "controller-hidden"}`}>

        <i className="fa fa-angle-double-left controller-icons" onClick={toggleController} />
        <h1>Main Control</h1>

        <TwitchLogin />

        {user ?

          (authorized ?
            <>
              <div className="flex-row">
                <label htmlFor="toggle-stream-interact">Stream Interact</label>
                <input type="checkbox" id="toggle-stream-interact" checked={streamZIndex === -1 ? false : true} onChange={handleStreamInteract} />
              </div>

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