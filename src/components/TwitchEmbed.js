import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// embeds the Twitch stream

function TwitchEmbed() {

  const { streamZIndex } = useContext(UserContext)

  return (
    <div id="twitch-embed" style={{ zIndex: streamZIndex, }}>
      <iframe src={`https://player.twitch.tv/?channel=${process.env.REACT_APP_STREAMER}&parent=${process.env.REACT_APP_PARENT}`}
        className="streamer-mode"
        frameBorder="0"
        title="Twitch Embed"
        width="1280"
        height="720" 
      />
    </div>
  )
}

export default TwitchEmbed;