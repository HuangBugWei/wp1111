import './App.css';

import { useState } from 'react';
import { startGame, guess, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  
  const handleGuess = async () => {
    const response = await guess(number)

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

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return (
    <div className='App'>
      {hasStarted ? game : startMenu}
      
    </div>
  );
}

export default App;
