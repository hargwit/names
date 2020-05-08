import React, { useEffect, useState } from 'react'
import { GameProvider, useGame } from './game-provider'
import { GAME_STATE } from '../constants'
import { navigate, Location } from '@reach/router'
import { useUserID } from '../user-context/user-provider'
import { Loading } from '../loading/loading'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'

const styles = {
  gameInfo: {
    height: '36px',
  },
  gameCode: {
    position: 'absolute',
    top: '8px',
    left: '4px',
    paddingLeft: '12px',
  },
  joinLink: {
    position: 'absolute',
    right: '4px',
    top: '4px',
    paddingTop: '4px',
    paddingBottom: '4px',
    border: 'none',
  },
}

const Game = ({ gameCode, children }) => (
  <GameProvider gameCode={gameCode}>
    <GameStateNavigation>
      <>
        <GameInfo gameCode={gameCode} />
        {children}
      </>
    </GameStateNavigation>
  </GameProvider>
)

const GameInfo = ({ gameCode }) => {
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const [copyText, setCopyText] = useState('Copy')

  function copyToClipboard(link) {
    setCopyText('Copying')
    setTimeout(() => {
      navigator.clipboard.writeText(link).then(() => {
        setCopyText('Copied')
        setTimeout(() => {
          setCopyText('Copy')
        }, 3000)
      })
    }, 750)
  }

  return (
    <>
      <div style={styles.gameInfo}>
        <div style={styles.gameCode}>
          Game code: <strong>{gameCode}</strong>
        </div>
        <Button
          onClick={openModal}
          variant='outline-primary'
          style={styles.joinLink}
        >
          Get link to game
        </Button>
      </div>
      <Modal show={open} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Link to join game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Location>
            {({ location: { origin } }) => {
              const link = `${origin}/join/${gameCode}`
              return (
                <InputGroup className='mb-3'>
                  <FormControl
                    value={link}
                    aria-label='Link to join the game'
                    aria-describedby='Link to join the game'
                    disabled
                  />
                  {document.queryCommandSupported('copy') && (
                    <InputGroup.Append>
                      <Button
                        disabled={copyText !== 'Copy'}
                        variant='outline-secondary'
                        aria-label='Copy link to join game'
                        onClick={() => copyToClipboard(link)}
                      >
                        {copyText}
                      </Button>
                    </InputGroup.Append>
                  )}
                </InputGroup>
              )
            }}
          </Location>
        </Modal.Body>
      </Modal>
    </>
  )
}

const GameStateNavigation = ({ children }) => {
  const game = useGame()
  const userID = useUserID()
  const [navigating, setNavigating] = useState(true)

  function doNavigate(url) {
    setNavigating(false)
    navigate(url)
  }

  useEffect(() => {
    if (!game) {
      navigate('/')
      return
    }

    switch (game.state) {
      case GAME_STATE.LOBBY:
        if (game.players[userID].enteredNames) {
          doNavigate(`/${game.id}/lobby`)
        } else {
          doNavigate(`/${game.id}/names`)
        }
        break
      case GAME_STATE.PLAYING:
        if (game.currentPlayer === userID) {
          doNavigate(`/${game.id}/round/${game.round}/play`)
        } else {
          doNavigate(`/${game.id}/round/${game.round}`)
        }
        break
      case GAME_STATE.END_GAME:
      default:
        doNavigate('/')
    }
  }, [game, userID])

  return navigating ? <Loading /> : children
}

export { Game }
