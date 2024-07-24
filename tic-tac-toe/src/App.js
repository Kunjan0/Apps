import React, { useState, useEffect } from 'react';
import './App.css';
import cowImage from './cow.png';
import bottleImage from './bottle.png';

const initialBoard = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOverMessage, setGameOverMessage] = useState('');

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      const message = winner === 'X' ? 'You are the winner!' : 'Oops! You lost the game. 😞';
      setWinner(winner);
      setGameOverMessage(message);
    } else if (!isXNext && !winner) {
      const bestMove = findBestMove(board, 'O');
      if (bestMove !== -1) {
        const newBoard = board.slice();
        newBoard[bestMove] = 'O';
        setBoard(newBoard);
        setIsXNext(true);
      }
    }
  }, [isXNext, board]);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index] && (
        <img
          src={board[index] === 'X' ? cowImage : bottleImage}
          alt={board[index]}
        />
      )}
    </button>
  );

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
    setGameOverMessage('');
  };

  return (
    <div className="game">
      <h1 style={{fontFamily:'cursive'}}>Tic Tac Toe</h1>
      <div className="game-board">
        {Array(9).fill(null).map((_, index) => renderSquare(index))}
      </div>
      <div className="game-info">
        <button className="reset-button" onClick={resetGame}>Reset / Play Again</button>
      </div>
      {winner && (
        <div className="game-over-message">
          <p>{gameOverMessage}</p>
        </div>
      )}
    </div>
  );
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function findBestMove(board, player) {
  const opponent = player === 'O' ? 'X' : 'O';

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = board.slice();
      newBoard[i] = player;
      if (calculateWinner(newBoard) === player) {
        return i;
      }
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = board.slice();
      newBoard[i] = opponent;
      if (calculateWinner(newBoard) === opponent) {
        return i;
      }
    }
  }

  const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}

export default App;
