import React, { useEffect } from 'react'

import { useJoinGame } from '../api/joinGame'
import { navigate } from '@reach/router'
import { useUserID } from '../user-context/user-provider'

import { Loading } from '../loading/loading'
import { useError } from '../error/error-provider'

function JoinLink({ gameCode }) {
  const userID = useUserID()
  const [joinGame] = useJoinGame(userID)
  const { setError } = useError()

  useEffect(() => {
    joinGame(gameCode.toUpperCase())
      .then((id) => navigate(`/${id}`))
      .catch((err) => {
        setError(err)
        navigate('/join')
      })
    // eslint-disable-next-line
  }, [])

  return <Loading />
}

export { JoinLink }
