import ScoreCard from './Score'
import { AppContextProvider } from './Context'
import { GameBoard } from './GameBoard'
import './App.css'

// Set background image, having issues doing it through css using github pages
document.body.style.backgroundImage = "url('./assets/memory.jpg')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.height = "100vh"; 
document.body.style.margin = "0"; 

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
