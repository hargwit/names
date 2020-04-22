import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'

const styles = {
  name: (removed) => ({
    textDecoration: removed ? 'line-through' : 'none',
    color: removed ? '#dc3545' : 'black',
  }),
  removeButton: {
    border: 'none',
    marginLeft: 'auto',
  },
  table: {
    marginLeft: '2rem',
    marginRight: '2rem',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  lastName: {
    marginLeft: '2rem',
    marginRight: '2rem',
    display: 'flex',
    alignItems: 'center',
  },
}

const EndTurnModal = ({
  show,
  handleClose,
  handleEndTurn,
  names,
  finalName,
}) => {
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

  function addFinalName() {
    const newNames = [...confirmedNames, { ...finalName, removed: false }]
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
            <div style={styles.table}>
              {confirmedNames.map((name) => (
                <div style={styles.row} key={name.id}>
                  <li />
                  <strong style={styles.name(name.removed)}>
                    {name.value}
                  </strong>
                  {name.removed ? (
                    <Button
                      style={styles.removeButton}
                      variant={'outline-success'}
                      onClick={() => putBack(name.id)}
                    >
                      Put back
                    </Button>
                  ) : (
                    <Button
                      style={styles.removeButton}
                      variant={'outline-danger'}
                      onClick={() => removeName(name.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {finalName.id && (
          <div>
            The last name shown was:
            <div style={styles.lastName}>
              <li />
              <strong style={styles.name(false)}>{finalName.value}</strong>
              <Button
                disabled={confirmedNames.find((n) => n.id === finalName.id)}
                style={styles.removeButton}
                variant={'outline-success'}
                onClick={addFinalName}
              >
                Add to names
              </Button>
            </div>
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
