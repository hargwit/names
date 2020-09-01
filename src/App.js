import React from 'react'
import { Router } from '@reach/router'
import { Home } from './pages/home'
import { JoinGame } from './pages/join-game'
import { Game } from './game/game'
import './firebase'
import { EnterNames } from './pages/enter-names'
import { Lobby } from './pages/lobby'
import { UserProvider } from './user-context/user-provider'
import { Round } from './pages/round'
import { Play } from './play/play'
import ErrorBoundary from './error/error-boundary'
import { JoinLink } from './join-game/join-link'
import { ErrorProvider } from './error/error-provider'
import { GameRules } from './game-rules/game-rules'

function App() {
  return (
    <div className='App'>
      <ErrorBoundary>
        <ErrorProvider>
          <UserProvider>
            <GameRules />
            <Router>
              <Home path='/' />
              <JoinGame path='/join' />
              <JoinLink path='/join/:gameCode' />
              <Game path='/:gameCode'>
                <EnterNames path='/names' />
                <Lobby path='/lobby' />
                <Round path='/round/:round' />
                <Play path='/round/:round/play' />
              </Game>
            </Router>
          </UserProvider>
        </ErrorProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
