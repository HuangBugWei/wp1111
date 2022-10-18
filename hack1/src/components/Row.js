/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    let outcase = ['', '', '', '', '']
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            
            <div className='Row-wrapper'>
                {(guess !== undefined) ? guess.map((w, idx) => <div id={rowIdx+'-'+idx} key={rowIdx+'-'+idx} className={'Row-wordbox '+ w.color}>{w.char}</div>): 
                    outcase.map((w, idx) => <div id={rowIdx+'-'+idx} key={rowIdx+'-'+idx} className='Row-wordbox'></div>)
                }
            </div>
            
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;