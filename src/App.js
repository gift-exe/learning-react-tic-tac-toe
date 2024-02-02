import './App.css';
import { useState } from 'react';

let draw;

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
    
    draw = onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  var status;

  if (winner) {
    status = 'Winner: ' + winner;
  }else{
    status = 'Next Player: ' + (xturn ? 'X': 'O');
  }
  console.log('draw '+draw)
  if (draw) {
    status = "It's a draw";
  }

  
  let rows = [];

  for (let i = 0; i < 3; i++){
    let row_squares = [];
    for (let j = 0; j < 3; j++){
      const index = i * 3 + j;
      row_squares.push(<Square key={index} handleClick={() => handleClick(index)} value={squares[index]} />)
    }
    rows.push(<div key={i} className='board-row'>{row_squares}</div>)
  }


  return ( 
    <div>
      <div className='status'>{status}</div>
      {rows}
    </div>
  
        )
}

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xTurn = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  
  function checkDraw(){
    if (history.length === 9) {
      return true
    } else {
      return false
    }
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    return checkDraw()
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  let moves = history.map((squares, move) => {  //squares and move are progressive; square and move at index 0, 1, 2, 3, ...
    let description;
    
    if  (move === currentMove){
      description = 'You are at move #' + move;
    } else if (move > 0) {
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

  const [reverseOrder, SetReverseOrder] = useState(false);
  let reverseMoves = reverseOrder? moves.reverse() : moves

  function sortMoves() {
    var sort_type = document.getElementById('toggleButton').innerHTML

    if (sort_type === 'Ascending') {
      document.getElementById('toggleButton').innerHTML = 'Descending'
      SetReverseOrder(true)
    } else {
      document.getElementById('toggleButton').innerHTML = 'Ascending'
      SetReverseOrder(false)
    }    

    
  }
  
  return (
    <div className="game">
      <button id="toggleButton" onClick={sortMoves}>Ascending</button>
      <div className="game-board">
        <Board xturn={xTurn} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>
          {reverseMoves}
        </ol>
      </div>
    </div>
  );
}
