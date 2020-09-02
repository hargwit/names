import React, { useEffect } from 'react'
import { navigate } from '@reach/router'

import { useUserID } from 'components/user-context/user-provider'
import { Loading } from 'components/loading'
import { useError } from 'components/error/error-provider'

import { useJoinGame } from 'api/game/joinGame'

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
