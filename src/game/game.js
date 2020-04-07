import React from 'react'
import { GameProvider } from './game-provider'

const Game = ({ gameCode, subRoutes }) => (
  <GameProvider gameCode={gameCode}>{subRoutes()}</GameProvider>
)

export { Game }
