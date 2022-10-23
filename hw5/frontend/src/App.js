import logo from './logo.svg';
import './App.css';

import { useState } from 'react';

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  
  const handleGuess = async () => {
    // const response = await processGuessByBackend(number)
    const response = 'equal'

    if (response === 'Equal') {
      setHasWon(true)
    }else{
      setStatus(response)
      setNumber('')
    }
  }
  
  const startMenu = (
    <div>
      {/* someFunctionToBackend; and setHasStarted */}
      <button onClick={ setHasStarted }> start game</button>
    </div>
  )

  const gameMode = (
    <div>
      <p>Guess a number between 1 to 100</p>
      <input></input>
      <button onClick={handleGuess} disabled={!number}>guess!</button>
      <p>{status}</p>
    </div>
  )
  
  const winningMode = (
    <div>
      <p>you won! the number was {number}.</p>
      <button>restart</button>
    </div>
  )


  return (
    <div className='App'>
      {/* {hasStarted ? gameMode : startMenu} */}
      {startMenu}
      {gameMode}
      {winningMode}
    </div>
  );
}

export default App;
