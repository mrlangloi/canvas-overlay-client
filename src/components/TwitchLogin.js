import axios from 'axios';
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function TwitchLogin() {

  const { user, setUser } = useContext(UserContext);

  async function handleLogin(e) {
    await axios.get(`${process.env.REACT_APP_API_URL}/auth/twitch`, { withCredentials: true })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    setUser(response.data);
  }

  return (
    <div className="twitch-login flex-column">
      {user ? 
        <>
          <h3>{user.display_name}</h3> 
          <a href={`${process.env.REACT_APP_API_URL}/auth/logout`}>Logout</a>
        </>
        : 
        <button className="button" id="login-button" onClick={handleLogin}>Login</button>
      }
    </div>
  )
}

export default TwitchLogin;