import React from 'react'

import { Alert } from 'react-bootstrap'
import { Container } from './layout/container'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Alert variant='danger'>
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p>
              Oh snap! Something has gone wrong! Please refresh the page to fix
              this problem.
            </p>
          </Alert>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
