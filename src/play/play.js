import React, { useState, useEffect } from 'react'
import { useGame } from '../game/game-provider'
import { Container } from '../layout/container'
import { Button } from 'react-bootstrap'

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

  const [showPass, setShowPass] = useState('')
  const [currentPass, setCurrentPass] = useState('')
  const [currentName, setCurrentName] = useState('')
  const [gotNames, setGotNames] = useState([])

  useEffect(() => {
    const names = game.names
      .filter((name) => name.lastRound !== round)
      .map((name) => name.value)
      .filter((name) => !gotNames.includes(name))
      .filter((name) => name !== currentPass)
    const index = Math.floor(Math.random() * Math.floor(names.length))
    const newName = names[index]
    setCurrentName(newName)
  }, [game.names, gotNames, currentPass])

  const addGotName = () => {
    if (showPass) {
      setShowPass(false)
      setCurrentPass('')
      setGotNames([...gotNames, currentPass])
    } else {
      setGotNames([...gotNames, currentName])
      setCurrentName('')
    }
  }

  const pass = (name) => {
    setCurrentPass(name)
  }

  const unPass = () => {
    setShowPass(true)
  }

  return (
    <Container>
      <h1>{showPass ? currentPass : currentName}</h1>
      <div>
        {showPass ? (
          <p>
            Next word: <strong>{currentName || '-'}</strong>
          </p>
        ) : (
          <p>
            Current pass: <strong>{currentPass || '-'}</strong>
          </p>
        )}
        <p>
          Score: <strong>{gotNames.length}</strong>
        </p>
      </div>
      <div style={styles.buttons}>
        <div style={styles.playControls}>
          <Button
            onClick={addGotName}
            style={styles.playButton}
            variant='primary'
            size='lg'
          >
            Next!
          </Button>
          <Button
            onClick={currentPass ? () => unPass() : () => pass(currentName)}
            style={styles.playButton}
            variant='warning'
            size='lg'
          >
            {currentPass && !showPass ? 'Unpass!' : 'Pass!'}
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
