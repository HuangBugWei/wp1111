/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    board[x][y].revealed = true;
    newNonMinesCount--;

    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

    if (x < board.length - 1 && board[x+1][y].flagged === false && board[x+1][y].revealed === false && board[x+1][y].value !== '💣'){
      let output = revealed(board, x+1, y, newNonMinesCount)
      board = output.board
      newNonMinesCount = output.newNonMinesCount
    }

    if (x > 0 && board[x-1][y].flagged === false && board[x-1][y].revealed === false && board[x-1][y].value !== '💣'){
      let output = revealed(board, x-1, y, newNonMinesCount)
      board = output.board
      newNonMinesCount = output.newNonMinesCount
    }
    
    if (y < board[0].length && board[x][y+1].flagged === false && board[x][y+1].revealed === false && board[x][y+1].value !== '💣'){
      let output = revealed(board, x, y+1, newNonMinesCount)
      board = output.board
      newNonMinesCount = output.newNonMinesCount
    }

    if (y > 0 && board[x][y-1].flagged === false && board[x][y-1].revealed === false && board[x][y-1].value !== '💣'){
      let output = revealed(board, x, y-1, newNonMinesCount)
      board = output.board
      newNonMinesCount = output.newNonMinesCount
    }

    return { board, newNonMinesCount };
};
