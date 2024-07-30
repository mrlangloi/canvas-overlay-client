import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function TwitchLogin() {

  const { user } = useContext(UserContext);

  return (
    <>
      {user ? 
        <>
          <h3>{user.display_name}</h3> 
          <a href={`http://localhost:3500/auth/logout`}>Logout</a>
        </>
        : 
        <a href={`http://localhost:3500/auth/twitch`}>Login with Twitch</a>
      }
    </>
  )
}

export default TwitchLogin;