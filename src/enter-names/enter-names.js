import React, { useState } from 'react'
import { useGame } from '../game/game-provider'

import { container, column, alignCenter, justifyEven } from '../layout/styles'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useSubmitNames } from './api'
import { navigate } from '@reach/router'

const EnterNames = () => {
  const game = useGame()
  const [submitNames, loading] = useSubmitNames(game.id)
  const [names, setNames] = useState(['', '', '', '', ''])

  const updateNames = (index, name) => {
    const newNames = [...names]
    newNames[index] = name
    setNames(newNames)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitNames(names).then(() => {
      navigate('lobby')
    })
  }

  const disableButton =
    !!names[0] && !!names[1] && !!names[2] && !!names[3] && !!names[4]

  return (
    <div
      style={{
        ...container,
        ...column,
        ...alignCenter,
        ...justifyEven,
      }}
    >
      {loading ? (
        <Spinner animation='border' />
      ) : (
        <>
          <h1>Enter names</h1>
          <div
            style={{
              ...column,
              ...alignCenter,
            }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='formName1'>
                <Form.Label>Name 1</Form.Label>
                <Form.Control
                  value={names[0]}
                  onChange={(event) => updateNames(0, event.target.value)}
                  type='text'
                  placeholder='Enter name 1'
                />
              </Form.Group>

              <Form.Group controlId='formName2'>
                <Form.Label>Name 2</Form.Label>
                <Form.Control
                  value={names[1]}
                  onChange={(event) => updateNames(1, event.target.value)}
                  type='text'
                  placeholder='Enter name 2'
                />
              </Form.Group>

              <Form.Group controlId='formName3'>
                <Form.Label>Name 3</Form.Label>
                <Form.Control
                  value={names[2]}
                  onChange={(event) => updateNames(2, event.target.value)}
                  type='text'
                  placeholder='Enter name 3'
                />
              </Form.Group>

              <Form.Group controlId='formName4'>
                <Form.Label>Name 4</Form.Label>
                <Form.Control
                  value={names[3]}
                  onChange={(event) => updateNames(3, event.target.value)}
                  type='text'
                  placeholder='Enter name 4'
                />
              </Form.Group>

              <Form.Group controlId='formName5'>
                <Form.Label>Name 5</Form.Label>
                <Form.Control
                  value={names[4]}
                  onChange={(event) => updateNames(4, event.target.value)}
                  type='text'
                  placeholder='Enter name 5'
                />
              </Form.Group>

              <Button variant='primary' type='submit' disabled={!disableButton}>
                Submit names
              </Button>
            </Form>
          </div>
        </>
      )}
    </div>
  )
}

export { EnterNames }
