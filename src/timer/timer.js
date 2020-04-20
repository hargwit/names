import React, { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Button } from 'react-bootstrap'
import { FaUndo, FaPause, FaPlay } from 'react-icons/fa'
import { useAudio } from './audio'

const styles = {
  timer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: '#6c757d',
  },
  value: {
    fontSize: '40px',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    border: 'none',
    borderRadius: '20px',
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
  },
}

function Timer() {
  const [playing, setPlaying] = useState(false)
  const [key, setKey] = React.useReducer((c) => c + 1, 0)
  const [ended, setEnded] = useState(false)
  const audio = useAudio()

  function start() {
    setPlaying(true)
    setEnded(false)
  }

  function stop() {
    setPlaying(false)
  }

  function reset() {
    setPlaying(false)
    setKey()
    setEnded(false)
    audio.stop()
  }

  return (
    <div>
      <CountdownCircleTimer
        key={key}
        isPlaying={playing}
        durationSeconds={30}
        colors={[['#007bff', 0.33], ['#ffc107', 0.33], ['#dc3545']]}
        renderTime={(value) => (
          <div style={styles.timer}>
            <div style={styles.text}>Remaining</div>
            <div style={styles.value}>{value}</div>
            <div style={styles.text}>seconds</div>
          </div>
        )}
        onComplete={() => {
          setEnded(true)
          audio.play()
        }}
      />
      <div style={styles.buttons}>
        {playing ? (
          <Button
            disabled={ended}
            aria-label='pause timer'
            variant='outline-secondary'
            onClick={stop}
            style={styles.button}
          >
            <FaPause />
          </Button>
        ) : (
          <Button
            disabled={ended}
            aria-label='play timer'
            variant='outline-secondary'
            onClick={start}
            style={styles.button}
          >
            <FaPlay />
          </Button>
        )}
        <Button
          aria-label='reset timer'
          variant='outline-secondary'
          onClick={reset}
          style={styles.button}
        >
          <FaUndo />
        </Button>
      </div>
    </div>
  )
}

export { Timer }
