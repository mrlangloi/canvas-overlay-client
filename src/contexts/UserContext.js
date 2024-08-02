import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [authorized, setAuthorized] = useState(false)

  const [streamZIndex, setStreamZIndex] = useState(-1)

  const values = {
    user,
    setUser,
    authorized,
    setAuthorized,
    streamZIndex,
    setStreamZIndex,
  }

  // check for a token in the URL on render
  useEffect(() => {
    // extract the token from the URL
    const params = new URLSearchParams(window.location.search);
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

  return (
    <UserContext.Provider value={ values }>
      {children}
    </UserContext.Provider>
  )
}