import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { SocketContext } from './SocketContext'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [authorized, setAuthorized] = useState(false)
  const [listOfUsers, setListOfUsers] = useState([])

  const [streamZIndex, setStreamZIndex] = useState(-1)

  const { socket, emitEvent } = useContext(SocketContext)

  const values = {
    user,
    setUser,
    authorized,
    setAuthorized,
    listOfUsers,
    setListOfUsers,
    streamZIndex,
    setStreamZIndex,
  }

  // check for a token in the URL on render
  useEffect(() => {
    // extract the token from the URL
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (token) {
      // store the token in localStorage
      localStorage.setItem('token', token)

      window.location.href = '/'
    } 
  }, [])

  // check for a token in localStorage on render
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.post(`${process.env.REACT_APP_API_URL}/auth/verify`, { token })
        .then(response => {
          // console.log(response)
          setUser(response.data.user)
          if (response.status === 200) {
            setAuthorized(true)
          }
          else {
            setAuthorized(false)
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [])

  function updateActiveUsers(activeUsers) {
    setListOfUsers(activeUsers)
  }

  // function getUsers(activeUsers) {
  //   setListOfUsers(activeUsers)
  //   console.log('list of users: ', listOfUsers)
  // }

  useEffect(() => {
    if (socket && user && authorized) {
      socket.on('updateActiveUsers', updateActiveUsers)
      // socket.on('getUsers', getUsers)

      emitEvent('addActiveUser', {
        socketID: socket.id,
        twitchID: user.id,
        login: user.login,
        display_name: user.display_name,
        x: 0,
        y: 0,
      })

      return () => {
        if (socket && user && authorized) {
          console.log('socket cleanup')
          socket.off('updateActiveUsers', updateActiveUsers)
          // socket.off('getUsers', getUsers)
        }
      }
    }
  }, [socket, user, authorized, emitEvent])

  return (
    <UserContext.Provider value={ values }>
      {children}
    </UserContext.Provider>
  )
}