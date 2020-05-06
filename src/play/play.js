import React, { useEffect, useState } from 'react'
import { useGameListener } from '../game/game-provider'
import { Container } from '../layout/container'
import { Button } from 'react-bootstrap'
import { usePlay } from './play-reducer'
import { useEndTurn } from './api'
import { Loading } from '../loading/loading'
import { FaUndo } from 'react-icons/fa'
import { useMediaQuery } from '../layout/hooks'
import { EndTurnModal } from './end-turn'

const makeStyles = (narrow) => ({
  buttons: {
    width: narrow ? '300px' : '370px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playControls: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: '5rem',
  },
  nextControls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: narrow ? '20px' : '30px',
  },
  passControls: {
    width: narrow ? '140px' : '170px',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  playButton: {
    height: narrow ? '60px' : '80px',
    width: narrow ? '90px' : '120px',
  },
  endGameButton: {
    width: narrow ? '200px' : '270px',
  },
  playInfo: {
    width: '110px',
  },
  name: {
    textAlign: 'center',
    width: narrow ? '300px' : '370px',
    wordWrap: 'break-word',
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
})

const Play = ({ round }) => {
  const game = useGameListener()
  const [endTurn, loading] = useEndTurn(game.id, round)
  const gameNames = game.names.filter((name) => name.lastRound !== round)
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
  const narrow = useMediaQuery('(max-width: 370px)')
  const styles = makeStyles(narrow)

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

  function handleEndTurn(nameIDs) {
    handleCloseModal()
    endTurn(nameIDs)
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
          {currentName.id ? currentName.value : 'No more names'}
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
                disabled={!currentName.id}
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
            style={styles.endGameButton}
            variant='primary'
            size='lg'
          >
            End turn
          </Button>
        </div>
      </Container>
      <EndTurnModal
        show={showModal}
        handleClose={handleCloseModal}
        handleEndTurn={handleEndTurn}
        names={completedNames}
        finalName={currentName}
      />
    </>
  )
}

export { Play }
