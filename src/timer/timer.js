import React, { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Button } from 'react-bootstrap'

const styles = {
  timer: {
    fontFamily: 'Montserrat',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: '#aaa',
  },
  value: {
    fontSize: '40px',
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
      <div>
        {playing ? (
          <Button disabled={ended} onClick={stop}>
            Pause
          </Button>
        ) : (
          <Button disabled={ended} onClick={start}>
            Play
          </Button>
        )}
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  )
}

export { Timer }
