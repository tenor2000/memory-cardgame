import { useAppContext } from "./Context.jsx";
import { useEffect, useState } from "react";
import { capitalize, getInfoFromApi, shuffle } from "./helperFunc";

export function GameBoard() {
  const { clickedCards, setClickedCards,
    currentScore, setCurrentScore,
    bestScore, setBestScore,
    gameCards, setGameCards, 
    gameStarted, setGameStarted, 
    isGameOver, setIsGameOver, 
    isVictory, setIsVictory } = useAppContext();

  const [loading, setLoading] = useState(false);

    
  useEffect(() => {
    
    if (gameStarted) {
      setLoading(true);
      setIsGameOver(false);
      setIsVictory(false);
      createCardList().then((infoList) => {
        setGameCards(infoList.map(cardInfo => createCard(cardInfo)));
        setLoading(false);
      });
    }
  }, [gameStarted]);

  useEffect(() => {
    console.log("Card Added:", clickedCards.length);
    console.log('Clicked Cards:', clickedCards);
    if (currentScore > bestScore) {
      setBestScore(currentScore); 
    }

    if (clickedCards.length === 12) {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setGameStarted(false);
      setIsGameOver(true);
      setIsVictory(true);
    }

    if (new Set(clickedCards).size !== clickedCards.length) {
      if (currentScore > bestScore) {
        setBestScore(currentScore-1); //-1 because it includes the duplicated card that triggere event
      }
      setGameStarted(false);
      setGameCards([]);
      setClickedCards([]);
      setIsGameOver(true)
      setCurrentScore(0);
    }
  }, [clickedCards]);

  const handleClick = (card) => {
    setGameCards(prevCards => shuffle(prevCards));
    setClickedCards(prevCards => [...prevCards, card.name]);
    setCurrentScore(prevScore => prevScore + 1);
  };

  const createCard = (cardObj) => {
    return (
      <button key={cardObj.id} className="pokemon-card" onClick={() => handleClick(cardObj)}>
        <img src={cardObj.imageUrl} alt={cardObj.name} />
        <h2>{cardObj.name}</h2>
      </button>
    );
  };

  const createCardList = async () => {
    let idList = [];
    for (let i = 0; i < 12; i++) {
      let randomId = Math.floor(Math.random() * 1025) + 1;
      while (idList.includes(randomId)) {
        randomId = Math.floor(Math.random() * 1025) + 1;
      }
      idList.push(randomId);
    }

    let cardList = [];
    for (let i = 0; i < idList.length; i++) {
      const pokemon = await getInfoFromApi(idList[i]);
      cardList[i] = {
        name: capitalize(pokemon.name),
        imageUrl: pokemon.sprites.other["official-artwork"].front_default,
        id: idList[i]
      };
    }
    return cardList;
  };

  return (
    <>
      <div>
        <h1>GameBoard</h1>
      </div>
      {loading && 
        <div className='loading'>
          <h2>Setting Up Game...</h2>
        </div>
      }
      {gameStarted && 
        <div className="card-area">
          {gameCards}
        </div>
      }
      {!gameStarted && <button onClick={() => setGameStarted(true)}>Start</button>}
      {isGameOver && <h2>Game Over: Try again!</h2>}
      {isVictory && <h1>Congratulations, you beat the game!</h1>}
    </>
  );
}
