import React from 'react'
import { Spinner } from 'react-bootstrap'
import { Container } from '../layout/container'

const Loading = () => (
  <Container>
    <Spinner animation='border' />
  </Container>
)

export { Loading }
