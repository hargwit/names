import React, { useState, useEffect } from 'react'
import { useGame } from '../game/game-provider'
import { Container } from '../layout/container'
import { Button } from 'react-bootstrap'
import { usePlay } from './play-reducer'

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
}

const Play = ({ round }) => {
  const game = useGame()
  const {
    nextName,
    currentPass,
    currentName,
    completedNames,
    setNewName,
    passName,
    unPassName,
  } = usePlay(
    game.names
      .filter((name) => name.lastRound !== round)
      .map((name) => name.value),
  )

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

  return (
    <Container>
      <h1>{currentName}</h1>
      <div>
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
          <Button style={styles.playButton} variant='primary' size='lg'>
            Next!
          </Button>
          <Button
            onClick={handlePass}
            style={styles.playButton}
            variant='warning'
            size='lg'
          >
            {currentPass ? 'Unpass!' : 'Pass!'}
          </Button>
        </div>
        <Button style={styles.button} variant='primary' size='lg'>
          End turn
        </Button>
      </div>
    </Container>
  )
}

export { Play }
