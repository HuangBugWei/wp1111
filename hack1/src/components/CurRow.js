/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');
    let nullSpace = 5 - letters.length
    for (let i = 0; i < nullSpace; i++) {
        letters.push('')
    }
    console.log(letters)
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                {letters.map((w, idx) => (w !== "") ? <div id={rowIdx+'-'+idx} key={rowIdx+'-'+idx} className={'Row-wordbox filled'}>{w.char}</div> : <div id={rowIdx+'-'+idx} key={rowIdx+'-'+idx} className='Row-wordbox'></div> )}
                
                {/* <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div> */}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
