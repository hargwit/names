import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BsInfo } from 'react-icons/bs'

const styles = {
  description: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    paddingLeft: '20px',
  },
  infoIcon: {
    marginLeft: '4px',
  },
}

export const RulesModal = ({ round }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant='outline-secondary'
        style={styles.description}
        onClick={() => setOpen(true)}
      >
        {roundNames[round]}
        <BsInfo style={styles.infoIcon} />
      </Button>
      <Modal show={open} onHide={() => setOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{roundNames[round]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{roundRules[round]}</p>
        </Modal.Body>
      </Modal>
    </>
  )
}

const roundNames = {
  1: 'Describe',
  2: 'One word',
  3: 'Act it out',
}

const roundRules = {
  1: (
    <>
      <p>
        <strong>Describe</strong> the name to your team mates, you can say
        anything you like except:
      </p>
      <ul>
        <li>The name, or any part of it</li>
        <li>"Rhymes with..."</li>
        <li>"Starts with..."</li>
      </ul>
      <p>
        <strong>No acting</strong> is allowed in this round.
      </p>
    </>
  ),
  2: (
    <>
      <p>
        The same names are in the hat but this time you can only say{' '}
        <strong>one word</strong> to describe them. You can say any word but
        some restrictions:
      </p>
      <ul>
        <li>You cannot say any part of the name</li>
        <li>"Prime minister" is two words</li>
        <li>
          You must say the same word when you return to a pass from earlier in
          your turn
        </li>
      </ul>
      <p>
        <strong>No acting</strong> is allowed in this round.
      </p>
    </>
  ),
  3: (
    <>
      <p>
        The same names are in the hat, this time you{' '}
        <strong>act them out</strong> to your teams mates. You can act however
        you like but some restrictions:
      </p>
      <ul>
        <li>No speaking</li>
        <li>No sound effects</li>
        <li>No mouthing any words</li>
      </ul>
    </>
  ),
}
