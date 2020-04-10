import React from 'react'
import { Router } from '@reach/router'
import { Home } from './home/home'
import { JoinGame } from './join-game/join-game'
import { Game } from './game/game'
import './firebase'
import { EnterNames } from './enter-names/enter-names'
import { Lobby } from './lobby/lobby'
import { UserProvider } from './user-context/user-provider'
import { Round } from './round/round'

function App() {
  return (
    <div className='App'>
      <UserProvider>
        <Router>
          <Home path='/' />
          <JoinGame path='/join' />
          <Game path='/:gameCode'>
            <EnterNames path='/names' />
            <Lobby path='/lobby' />
            <Round path='/round/:round/' />
          </Game>
        </Router>
      </UserProvider>
    </div>
  )
}

export default App
