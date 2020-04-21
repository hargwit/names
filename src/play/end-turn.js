import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const EndTurnModal = ({ show, handleClose, handleEndTurn, names }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Confirm your score</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You scored <strong>{names.length}</strong> name
        {names.length !== 1 && 's'}!
        {names.length > 0 && (
          <div>
            Your names:
            <ul>
              {names.map((name) => (
                <li key={name.id}>
                  <strong>{name.value}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={() => handleEndTurn(names.map((n) => n.id))}
        >
          Confirm and end turn
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export { EndTurnModal }
