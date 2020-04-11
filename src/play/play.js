import React, { useEffect } from 'react'
import { useGame } from '../game/game-provider'
import { Container } from '../layout/container'
import { Button } from 'react-bootstrap'
import { usePlay } from './play-reducer'
import { useEndTurn } from './api'
import { Loading } from '../loading/loading'

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
  },
  playButton: {
    height: '80px',
    width: '120px',
    marginBottom: '5rem',
  },
  button: {
    width: '200px',
  },
  playInfo: {
    width: '110px',
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
  } = usePlay(gameNames)

  useEffect(() => {
    setNewName()
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
    endTurn(completedNames)
  }

  const namesLeft = gameNames.length - completedNames.length

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <h1>{currentName ? currentName : 'No more names'}</h1>
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
          <Button
            disabled={!currentName}
            onClick={handleNext}
            style={styles.playButton}
            variant='primary'
            size='lg'
          >
            Next!
          </Button>
          <Button
            disabled={!currentPass && namesLeft < 2}
            onClick={handlePass}
            style={styles.playButton}
            variant='warning'
            size='lg'
          >
            {currentPass ? 'Unpass!' : 'Pass!'}
          </Button>
        </div>
        <Button
          onClick={handleEndTurn}
          style={styles.button}
          variant='primary'
          size='lg'
        >
          End turn
        </Button>
      </div>
    </Container>
  )
}

export { Play }
