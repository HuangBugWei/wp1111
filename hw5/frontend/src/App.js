import './App.css';

import { useState } from 'react';
import { startGame, guess, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [upperbound, setUpperBound] = useState(100)
  const [lowerbound, setLowerBound] = useState(1)
  
  const handleGuess = async () => {
    const response = await guess(number)
    
    setStatus(response)

    if (response === 'Bang!!!') {
      setHasWon(true)
    }
    else if (response === 'Higher') {
      setLowerBound(number)
      setNumber('')
    }
    else if (response === 'Lower') {
      setUpperBound(number)
      setNumber('')
    }
    
  }
  
  const startMenu = (
    <div>
      {/* someFunctionToBackend; and setHasStarted */}
      <button onClick={ async() => {
        setHasStarted(true)
        let msg = await startGame()
        setStatus(msg)
      } }> start game</button>
      
    </div>
  )

  const gameMode = (
    <div>
      <p>Guess a number between {lowerbound} to {upperbound}</p>
      <input value={number} onChange={(e) => {setNumber(e.target.value)}}></input>
      <button onClick={ handleGuess } disabled={!number}>guess!</button>
      <p>{status}</p>
    </div>
  )
  
  const winningMode = (
    <div>
      <p>you won! the number was {number}.</p>
      <button onClick = {async() => {
        setHasWon(false)
        let msg = await restart()
        setStatus(msg)
        setUpperBound(100)
        setLowerBound(1)
        setNumber('')
      }}>restart</button>
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
