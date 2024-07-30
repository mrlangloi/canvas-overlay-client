import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {

    async function getUser() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, { withCredentials: true })

        console.log(response.data)

        if (response.data) {
          setUser(response.data)
          if (response.status === 200) {
            setAuthorized(true)
          }
          else {
            setAuthorized(false)
          }
        }
        else {
          setUser(null)
          setAuthorized(false)
        }
      }
      catch (error) {
        console.log(error)
      }
    }

    getUser();

  }, [])

  return (
    <UserContext.Provider value={{ user, authorized }}>
      {children}
    </UserContext.Provider>
  )
}