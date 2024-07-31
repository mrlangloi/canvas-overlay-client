import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function TwitchLogin() {

  const { user, setUser } = useContext(UserContext);

  return (
    <div className="twitch-login flex-column">
      {user ? 
        <>
          <h3>{user.display_name}</h3> 
          <a href={`${process.env.REACT_APP_API_URL}/auth/logout`}>Logout</a>
        </>
        : 
        <a href={`${process.env.REACT_APP_API_URL}/auth/twitch`}>Login</a>
      }
    </div>
  )
}

export default TwitchLogin;