import React, { useEffect, useState } from 'react'
import { GameProvider, useGame } from './game-provider'
import { GAME_STATE } from '../../constants'
import { navigate, Location } from '@reach/router'
import { useUserID } from '../../user-context/user-provider'
import { Loading } from '../loading'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'

const styles = {
  gameInfo: {
    height: '36px',
  },
  getInfoButton: {
    position: 'absolute',
    left: '4px',
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

  const [copyText, setCopyText] = useState({
    gameCode: 'Copy',
    joinLink: 'Copy',
  })

  function copyToClipboard(target) {
    return function (link) {
      setCopyText({ ...copyText, [target]: 'Copying' })
      setTimeout(() => {
        navigator.clipboard.writeText(link).then(() => {
          setCopyText((current) => ({ ...current, [target]: 'Copied' }))
          setTimeout(() => {
            setCopyText((current) => ({ ...current, [target]: 'Copy' }))
          }, 3000)
        })
      }, 750)
    }
  }

  return (
    <>
      <div style={styles.gameInfo}>
        <Button
          onClick={openModal}
          variant='outline-primary'
          style={styles.getInfoButton}
        >
          Share game
        </Button>
      </div>

      <Modal show={open} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Share game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor='game-code'>Game code</label>
          <InputGroup className='mb-3'>
            <FormControl
              id='game-code'
              value={gameCode}
              aria-label='Game code'
              aria-describedby='Game code'
              disabled
            />
            {document.queryCommandSupported('copy') && (
              <InputGroup.Append>
                <Button
                  disabled={copyText.gameCode !== 'Copy'}
                  variant='outline-secondary'
                  aria-label='Game code'
                  onClick={() => copyToClipboard('gameCode')(gameCode)}
                >
                  {copyText.gameCode}
                </Button>
              </InputGroup.Append>
            )}
          </InputGroup>
          <Location>
            {({ location: { origin } }) => {
              const link = `${origin}/join/${gameCode}`
              return (
                <>
                  <label htmlFor='join-link'>Link to join game</label>
                  <InputGroup className='mb-3'>
                    <FormControl
                      id='join-link'
                      value={link}
                      aria-label='Link to join the game'
                      aria-describedby='Link to join the game'
                      disabled
                    />
                    {document.queryCommandSupported('copy') && (
                      <InputGroup.Append>
                        <Button
                          disabled={copyText.joinLink !== 'Copy'}
                          variant='outline-secondary'
                          aria-label='Copy link to join game'
                          onClick={() => copyToClipboard('joinLink')(link)}
                        >
                          {copyText.joinLink}
                        </Button>
                      </InputGroup.Append>
                    )}
                  </InputGroup>
                </>
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
