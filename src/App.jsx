import { useState } from 'react'
import ScoreCard from './Score'
import { AppContextProvider } from './Context'
import { GameBoard } from './GameBoard'
import './App.css'

function App() {
  
  
  return (
    <AppContextProvider>
      <div className='App'>
        <div className='title-bar'>
          <h1>Memory Game</h1>
          <ScoreCard />
        </div>
        <div className='game-board'>
          <GameBoard />
        </div>
      </div>
    </AppContextProvider>
  )
}

export default App
