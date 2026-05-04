import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// shows a login button if the user is not logged in, or the user's name and a logout button if they are

function TwitchLogin() {

  const { user, setUser, setAuthorized } = useContext(UserContext);

  const env = process.env;
  const API_URL = env.REACT_APP_ENV === 'production' ? env.REACT_APP_API_URL : env.REACT_APP_API_URL2;

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    setAuthorized(false);
    window.location.reload();
  };

  return (
    <div className="twitch-login flex-column">
      {user ? 
        <>
          <h3>{user.display_name}</h3> 
          <a href="#" onClick={handleLogout}>Logout</a>
        </>
        : 
        <a href={`${API_URL}/auth/twitch`}>Login</a>
      }
    </div>
  )
}

export default TwitchLogin;