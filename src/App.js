import React from 'react'
import { Router } from '@reach/router'
import { Home } from './home/home'
import { JoinGame } from './join-game/join-game'
import { Game } from './game/game'
import './firebase'
import { EnterNames } from './enter-names/enter-names'
import { Lobby } from './lobby/lobby'

function App() {
  return (
    <div className='App'>
      <Router style={{ height: '100%' }}>
        <Home path='/' />
        <JoinGame path='/join' />
        <Game
          path='/:gameCode/*'
          subRoutes={() => (
            <Router style={{ height: '100%' }}>
              <EnterNames path='/names' />
              <Lobby path='/lobby' />
            </Router>
          )}
        ></Game>
      </Router>
    </div>
  )
}

export default App
