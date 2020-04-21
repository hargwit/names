import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'

const styles = {
  name: (removed) => ({
    textDecoration: removed ? 'line-through' : 'none',
  }),
}

const EndTurnModal = ({ show, handleClose, handleEndTurn, names }) => {
  const [confirmedNames, setConfirmedNames] = useState([])

  useEffect(() => {
    names.map((name) => ({ ...name, removed: false }))
    setConfirmedNames(names)
  }, [names])

  function removeName(id) {
    const newNames = confirmedNames.map((n) =>
      n.id === id
        ? {
            ...n,
            removed: true,
          }
        : n,
    )
    setConfirmedNames(newNames)
  }

  function putBack(id) {
    const newNames = confirmedNames.map((n) =>
      n.id === id
        ? {
            ...n,
            removed: false,
          }
        : n,
    )
    setConfirmedNames(newNames)
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Confirm your score</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You scored <strong>{confirmedNames.filter(notRemoved).length}</strong>{' '}
        name
        {confirmedNames.filter(notRemoved).length !== 1 && 's'}!
        {confirmedNames.length > 0 && (
          <div>
            Your names:
            <table>
              {confirmedNames.map((name) => (
                <tr key={name.id}>
                  <td>
                    <strong style={styles.name(name.removed)}>
                      {name.value}
                    </strong>
                  </td>
                  <td>
                    {name.removed ? (
                      <Button onClick={() => putBack(name.id)}>Put back</Button>
                    ) : (
                      <Button onClick={() => removeName(name.id)}>
                        Remove
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={() =>
            handleEndTurn(confirmedNames.filter(notRemoved).map((n) => n.id))
          }
        >
          Confirm and end turn
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function notRemoved(name) {
  return !name.removed
}

export { EndTurnModal }
