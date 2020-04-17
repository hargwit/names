import React, { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Button } from 'react-bootstrap'
import { FaUndo, FaPause, FaPlay } from 'react-icons/fa'

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
    margin: '4px',
  },
}

function Timer() {
  const [playing, setPlaying] = useState(false)
  const [key, setKey] = useState(0)
  const [ended, setEnded] = useState(false)

  function start() {
    setPlaying(true)
    setEnded(false)
  }

  function stop() {
    setPlaying(false)
  }

  function reset() {
    setPlaying(false)
    setKey(key + 1)
    setEnded(false)
  }

  return (
    <div>
      <CountdownCircleTimer
        key={key}
        isPlaying={playing}
        durationSeconds={30}
        colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
        renderTime={(value) => (
          <div style={styles.timer}>
            <div style={styles.text}>Remaining</div>
            <div style={styles.value}>{value}</div>
            <div style={styles.text}>seconds</div>
          </div>
        )}
        onComplete={() => {
          setEnded(true)
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
