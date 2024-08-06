import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function ActiveUsers() {

  const { listOfUsers } = useContext(UserContext)

  const users = listOfUsers?.map((user, index) => {
    return (
      <p key={index}>
        {user.display_name}
      </p>
    )
  })

  return (
    <div>
      <p>Active Users:</p>
      {users}
    </div>
  )
}

export default ActiveUsers;