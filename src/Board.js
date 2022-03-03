import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i =0; i < ncols; i++){
      initialBoard.push([]);
    }
    initialBoard.map(col => {
      for(let r = 0; r < nrows; r++){
        col.push(false);
      }
    });



    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      const newBoard = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, newBoard);
      flipCell(y-1, x, newBoard);
      flipCell(y+1, x, newBoard);
      flipCell(y, x-1, newBoard);
      flipCell(y, x+1, newBoard);

      // TODO: return the copy
      return newBoard;

    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  return(
    <table className="LightsOut-Board">
      {
        board.map((row, rIdx) =>(
          <tr>{row.map((col, cIdx) => (
              <Cell
                flipCellsAroundMe={() => flipCellsAround(`${rIdx}-${cIdx}`)}
                isLit={col}/>
              ))
            }
          </tr>
        ))
      }
    </table>
  );

  // TODO
}

export default Board;
