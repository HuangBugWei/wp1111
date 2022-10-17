/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.
        setBoard(newBoard.board);
        setMineLocations(newBoard.mineLocations);
        setRemainFlagNum(mineNum);
        setNonMineCount(boardSize * boardSize - mineNum);
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;
        
        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end
        if (!newBoard[x][y].revealed) {
            // console.log("not revealed")
            if (!newBoard[x][y].flagged && newFlagNum > 0) {
                newBoard[x][y].flagged = true
                newFlagNum -= 1
                
            } else if (newBoard[x][y].flagged) {
                newBoard[x][y].flagged = false
                newFlagNum += 1
            }
            setBoard(newBoard)
            setRemainFlagNum(newFlagNum)
        }
    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        let flipNum = 0;
        let newNonMinesCount = nonMineCount;

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
        // newBoard[x][y].revealed = true
        if (newBoard[x][y].value === '💣') {
            // newBoard[x][y].revealed = true
            mineLocations.forEach((cell) => { if (!newBoard[cell[0]][cell[1]].flagged) {newBoard[cell[0]][cell[1]].revealed = true}})
            setGameOver(true)
            setBoard(newBoard)
            // console.log("game over")
        } else {
            // implement DFS i guess
            if (newBoard[x][y].value === 0) {
                // let output = revealed(newBoard, x, y, newNonMinesCount)
                flipNum = DFS(x, y, newBoard, flipNum)
                newNonMinesCount -= flipNum
                // setBoard(output.board)
                // setNonMineCount(output.newNonMinesCount)
            } else {
                newBoard[x][y].revealed = true;
                // console.log('nonMineCount', nonMineCount);
                // console.log('newNonMinesCount', newNonMinesCount);
                newNonMinesCount--;
                // console.log('nonMineCount', nonMineCount);
                // console.log('newNonMinesCount', newNonMinesCount);
                flipNum += 1
                // newNonMineCount = newNonMineCount - flipNum
                // setBoard(newBoard);
                // setNonMineCount(newNonMinesCount);
            }
        }
        setBoard(newBoard);
        // setNonMineCount(newNonMinesCount);
        setNonMineCount(nonMineCount => nonMineCount - flipNum);
        console.log('result', nonMineCount)
        if (flipNum === nonMineCount){
            console.log("win")
            setGameOver(true)
            setWin(true)
        }
    };

    // terrible DFS
    const DFS = (x, y, newBoard, flipNum) => {
        const connected = []
        connected.push([x, y])
        while (connected.length) {
            let current = connected.pop()
            if ((newBoard[current[0]][current[1]].value !== '💣') && (newBoard[current[0]][current[1]].flagged === false) && (newBoard[current[0]][current[1]].revealed === false)) {
                newBoard[current[0]][current[1]].revealed = true
                flipNum += 1
                if (newBoard[current[0]][current[1]].value === 0){
                    
                    if (current[0] > 0) {
                        connected.push([current[0] - 1, current[1]])
                    }
                    if (current[1] > 0) {
                        connected.push([current[0], current[1] - 1])
                    }
                    if (current[0] < boardSize - 1) {
                        connected.push([current[0] + 1, current[1]])
                    }
                    if (current[1] < boardSize - 1) {
                        connected.push([current[0], current[1] + 1])
                    }
                    
                    
                    if ((current[0] > 0) && (current[1] > 0)) {
                        connected.push([current[0] - 1, current[1] - 1])
                    }
                    if ((current[0] > 0) && (current[1] < boardSize - 1)) {
                        connected.push([current[0] - 1, current[1] + 1])
                    }
                    if ((current[0] < boardSize - 1) && (current[1] > 0)) {
                        connected.push([current[0] + 1, current[1] - 1])
                    }
                    if ((current[0] < boardSize - 1) && (current[1] < boardSize - 1)) {
                        connected.push([current[0] + 1, current[1] + 1])
                    }
                }

            }
        }
        return flipNum
    };

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                {/* <h1>This is the board Page!</h1>  This line of code is just for testing. Please delete it if you finish this function. */}

                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                {/* <Modal /> */}
                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                <div className='boardContainer'>
                    <div>{"legal unflip:"+nonMineCount}</div>
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/>
                    {/* board = [[{ value: 0, revealed: false, x: x, y: y, flagged: false,}]] */}
                    {/* lecture 04 p.38 nested map */}
                    { board.map((row) => <div id={"row"+row[0].x} 
                                            style={{display: 'flex'}}>{row.map((col) => <Cell rowIdx={col.x} 
                                                                                                colIdx={col.y} 
                                                                                                detail={col} 
                                                                                                updateFlag={updateFlag} 
                                                                                                revealCell={revealCell}/>)}</div>)}
                    
                </div>
                { gameOver ? <Modal restartGame={restartGame} backToHome={backToHome} win={win}/> : null}
            </div>
        </div>
    );

}

export default Board