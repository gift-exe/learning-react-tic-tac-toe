import './App.css';
import { useState } from 'react';

function Square({value, handleClick}) {
  return (
    <button className='square' onClick={handleClick}>
      {value}
    </button>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({xturn, squares, onPlay}) {

  function handleClick(i) {
    
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xturn) {
      nextSquares[i] = 'X'
    }
    else {
      nextSquares[i] = 'O'
    }
    
    onPlay(nextSquares);

  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  }else{
    status = 'Next Player: ' + (xturn ? 'X': 'O');
  }

  return ( 
    <div>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square handleClick={() => handleClick(0)} value={squares[0]} />
        <Square handleClick={() => handleClick(1)} value={squares[1]} />
        <Square handleClick={() => handleClick(2)} value={squares[2]} />
      </div>

      <div className="board-row">
        <Square handleClick={() => handleClick(3)} value={squares[3]} />
        <Square handleClick={() => handleClick(4)} value={squares[4]} />
        <Square handleClick={() => handleClick(5)} value={squares[5]} />
      </div>

      <div className="board-row">
        <Square handleClick={() => handleClick(6)} value={squares[6]} />
        <Square handleClick={() => handleClick(7)} value={squares[7]} />
        <Square handleClick={() => handleClick(8)} value={squares[8]} />
      </div>
    </div>
  
        )
}

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xTurn = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xturn={xTurn} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
