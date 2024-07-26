import React, { useContext } from 'react';
import { StreamContext } from '../contexts/StreamContext';

function TwitchEmbed() {

  const { streamZIndex } = useContext(StreamContext)

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