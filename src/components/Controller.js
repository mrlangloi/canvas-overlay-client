import React from 'react';
import MediaControl from './MediaControl';

// sidebar to adjust the properties of current media card

function Controller(media) {
  return (
    <div className="controller">
      <MediaControl />
    </div>
  )
}

export default Controller;