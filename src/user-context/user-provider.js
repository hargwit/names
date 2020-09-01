import React, { createContext, useContext, useState } from 'react'

import { Loading } from '../loading/loading'
import { login } from '../api/auth'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState()
  const [loading, setLoading] = useState(true)

  login((user) => {
    if (user) {
      setUserID(user.uid)
      setLoading(false)
    } else {
      setUserID()
      setLoading(true)
    }
  })

  return loading ? (
    <Loading />
  ) : (
    <UserContext.Provider value={userID}>{children}</UserContext.Provider>
  )
}

const useUserID = () => {
  return useContext(UserContext)
}

export { UserProvider, useUserID }
