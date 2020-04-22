import React, { useState } from 'react'
import { useGame } from '../game/game-provider'
import { Container } from '../layout/container'
import { CenteredColumn } from '../layout/centered-column'
import { Button, Modal } from 'react-bootstrap'
import { useUserID } from '../user-context/user-provider'
import { useTakeTurn, useEndRound } from './api'
import { Loading } from '../loading/loading'
import { Timer } from '../timer/timer'

const styles = {
  button: {
    width: '200px',
    marginBottom: '1rem',
  },
}

const Round = ({ round }) => {
  const game = useGame()
  const userID = useUserID()
  const [takeTurn, loading] = useTakeTurn(game.id, userID)
  const [endRound, ending] = useEndRound(game.id)
  const [showTimer, setShowTimer] = useState(false)

  function handleShow() {
    setShowTimer(true)
  }

  function handleHide() {
    setShowTimer(false)
  }

  const namesLeft = game.names.filter((name) => name.lastRound !== round).length

  return loading || ending ? (
    <Loading />
  ) : (
    <>
      <Container>
        <h1>Round {round}</h1>
        <CenteredColumn>
          <p>
            Total names: <strong>{game.names.length}</strong>
          </p>
          <p>
            Names left: <strong>{namesLeft}</strong>
          </p>
        </CenteredColumn>
        <CenteredColumn>
          {namesLeft > 0 && (
            <Button
              onClick={handleShow}
              style={styles.button}
              variant='primary'
              size='lg'
            >
              Open timer
            </Button>
          )}
          {namesLeft === 0 ? (
            <Button
              onClick={endRound}
              style={styles.button}
              variant='primary'
              size='lg'
            >
              End round
            </Button>
          ) : (
            <Button
              disabled={!!game.currentPlayer}
              style={styles.button}
              variant='primary'
              size='lg'
              onClick={takeTurn}
            >
              Take my turn
            </Button>
          )}
        </CenteredColumn>
      </Container>
      <Modal show={showTimer} onHide={handleHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Timer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Timer />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleHide}>
            Close timer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export { Round }
