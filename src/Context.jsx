import { createContext, useContext, useState } from 'react';
import ScoreCard from './Score.jsx';
const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameCards, setGameCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  const value = {
    currentScore, setCurrentScore,
    bestScore, setBestScore,
    isGameOver, setIsGameOver,
    gameCards, setGameCards,
    clickedCards, setClickedCards,
    gameStarted, setGameStarted,
    isVictory, setIsVictory
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
