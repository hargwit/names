import React, { createContext, useContext, useState } from 'react'
import { auth } from '../firebase'

import { Loading } from '../loading/loading'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState()
  const [loading, setLoading] = useState(true)

  auth.signInAnonymously()
  auth.onAuthStateChanged((user) => {
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
  const userID = useContext(UserContext)
  return userID
}

export { UserProvider, useUserID }
