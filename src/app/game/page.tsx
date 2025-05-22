"use client";

import { useState } from "react";
import Board from "./components/Board";

export default function GamePage() {
  const [boardSize, setBoardSize] = useState(6);
  const [knightPosition, setKnightPosition] = useState({ row: 0, col: 0 });
  const [visited, setVisited] = useState<Record<string, number>>(() => ({
    "0-0": 1,
  }));

  const isValidKnightMove = (
    from: { row: number; col: number },
    to: { row: number; col: number }
  ) => {
    const dr = Math.abs(to.row - from.row);
    const dc = Math.abs(to.col - from.col);
    return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
  };

  const handleCellClick = (row: number, col: number) => {
    const to = { row, col };
    const key = `${row}-${col}`;

    if (isValidKnightMove(knightPosition, to) && !(key in visited)) {
      const newVisited = {
        ...visited,
        [key]: Object.keys(visited).length + 1,
      };

      setVisited(newVisited);
      setKnightPosition(to);

      if (isGameOver(to, newVisited, boardSize)) {
        alert("Game Over! No more valid moves.");
      }
    }
  };

  const isGameOver = (
    position: { row: number; col: number },
    visited: Record<string, number>,
    boardSize: number
  ) => {
    const moves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];

    return moves.every(([dr, dc]) => {
      const r = position.row + dr;
      const c = position.col + dc;
      const key = `${r}-${c}`;
      const isInBounds = r >= 0 && r < boardSize && c >= 0 && c < boardSize;
      return !isInBounds || key in visited;
    });
  };

  const resetGame = () => {
    setKnightPosition({ row: 0, col: 0 });
    setVisited({ "0-0": 1 });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100">
      <h1 className="text-3xl font-bold">Knight&apos;s Tour Game</h1>
      <Board
        size={boardSize}
        knightPosition={knightPosition}
        onCellClick={handleCellClick}
        visited={visited}
      />
      <button
        onClick={resetGame}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Reset Game
      </button>
    </main>
  );
}
