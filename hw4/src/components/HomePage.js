/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState, useEffect } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment Some functions may be added here! */}
  
  useEffect(() => {setError((mineNum >= (boardSize * boardSize)) ? true : false)}, [mineNum, boardSize])

  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */}
      <button className='btn' onClick={error ? null : startGameOnClick}>Start Game</button>
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className='controlContainer'>
        <button className='btn' onClick={() => {setShowPanel(showPanel ? false : true)}}>Difficulty Adjustment</button>
        <div className='controlWrapper' style={{display: showPanel ? 'block' : 'none'}}>
          <div className='error' style={{visibility: error ? 'visible' : 'hidden'}}>ERROR: Mines number and board size are invalid!</div>
          <div className='controlPanel'>
            <div className='controlCol'>
              <p className='controlTitle'>Mines Number</p>
              <input type = 'range' step='1' min = '1' max = '99' defaultValue = {mineNum} onChange={mineNumOnChange}/>
              <p className='controlNum' style={{color: error ? '#880000' : '#0f0f4b'}}>{mineNum}</p>
            </div>
            <div className='controlCol'>
              <p className='controlTitle'>Board Size (nxn)</p>
              <input type = 'range' step='1' min = '1' max = '30' defaultValue = {boardSize} onChange={boardSizeOnChange}/>
              <p className='controlNum' style={{color: error ? '#880000' : '#0f0f4b'}}>{boardSize}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default HomePage;   