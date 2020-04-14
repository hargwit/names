import React, { useEffect, useState } from 'react'
import { useGame } from '../game/game-provider'
import { Container } from '../layout/container'
import { Button, Modal } from 'react-bootstrap'
import { usePlay } from './play-reducer'
import { useEndTurn } from './api'
import { Loading } from '../loading/loading'
import { FaUndo } from 'react-icons/fa'

const styles = {
  buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playControls: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: '5rem',
  },
  nextControls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passControls: {
    width: '170px',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  playButton: {
    height: '80px',
    width: '120px',
  },
  button: {
    width: '200px',
  },
  playInfo: {
    width: '110px',
  },
  name: {
    textAlign: 'center',
  },
  undoButton: {
    border: 'none',
    borderRadius: '20px',
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10px',
  },
}

const Play = ({ round }) => {
  const game = useGame()
  const [endTurn, loading] = useEndTurn(game.id, round)
  const gameNames = game.names
    .filter((name) => name.lastRound !== round)
    .map((name) => name.value)
  const {
    nextName,
    currentPass,
    currentName,
    completedNames,
    setNewName,
    passName,
    unPassName,
    undo,
  } = usePlay(gameNames)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setNewName()
    // eslint-disable-next-line
  }, [])

  function handlePass() {
    if (currentPass) {
      unPassName()
    } else {
      passName()
    }
  }

  function handleNext() {
    setNewName()
  }

  function handleEndTurn() {
    handleCloseModal()
    endTurn(completedNames)
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  function handleOpenModal() {
    setShowModal(true)
  }

  const namesLeft = gameNames.length - completedNames.length

  return loading ? (
    <Loading />
  ) : (
    <>
      <Container>
        <h1 style={styles.name}>
          {currentName ? currentName : 'No more names'}
        </h1>
        <div style={styles.playInfo}>
          {nextName ? (
            <p>
              Next name: <strong>{nextName}</strong>
            </p>
          ) : (
            <p>
              Current pass: <strong>{currentPass || '-'}</strong>
            </p>
          )}
          <p>
            Score: <strong>{completedNames.length}</strong>
          </p>
        </div>
        <div style={styles.buttons}>
          <div style={styles.playControls}>
            <div style={styles.nextControls}>
              <Button
                disabled={!currentName}
                onClick={handleNext}
                style={styles.playButton}
                variant='primary'
                size='lg'
              >
                Next
              </Button>
              <Button
                aria-label='Undo last name'
                disabled={completedNames.length === 0}
                style={styles.undoButton}
                variant='outline-secondary'
                onClick={undo}
              >
                <FaUndo />
              </Button>
            </div>
            <div style={styles.passControls}>
              <Button
                disabled={!currentPass && namesLeft < 2}
                onClick={handlePass}
                style={styles.playButton}
                variant='warning'
                size='lg'
              >
                {currentPass ? 'Unpass' : 'Pass'}
              </Button>
            </div>
          </div>
          <Button
            onClick={handleOpenModal}
            style={styles.button}
            variant='primary'
            size='lg'
          >
            End turn
          </Button>
        </div>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header>
          <Modal.Title>Confirm your score</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You scored <strong>{completedNames.length}</strong> name
          {completedNames.length !== 1 && 's'}!
          {completedNames.length > 0 && (
            <div>
              Your names:
              <ul>
                {completedNames.map((name, index) => (
                  <li key={name + index}>
                    <strong>{name}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleEndTurn}>
            Confirm and end turn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export { Play }
