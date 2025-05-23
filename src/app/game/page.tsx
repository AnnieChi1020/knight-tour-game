"use client";

import { useEffect, useState } from "react";
import Board from "./components/Board";
import type { Position } from "./types";
import { BOARD_SIZES } from "./constants";
import { isValidKnightMove, isGameOver, getValidMoves } from "./utils";

export default function GamePage() {
  const [boardSize, setBoardSize] = useState<(typeof BOARD_SIZES)[number]>(
    BOARD_SIZES[0]
  );
  const [knightPosition, setKnightPosition] = useState<Position>({
    row: 0,
    col: 0,
  });
  const [visited, setVisited] = useState<Record<string, number>>(() => ({
    "0-0": 1,
  }));

  useEffect(() => {
    setKnightPosition({ row: 0, col: 0 });
    setVisited({ "0-0": 1 });
  }, [boardSize]);

  const handleCellClick = (row: number, col: number) => {
    const to: Position = { row, col };
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

  const resetGame = () => {
    setKnightPosition({ row: 0, col: 0 });
    setVisited({ "0-0": 1 });
  };

  const validMoves = getValidMoves(knightPosition, visited, boardSize);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-6"
      style={{ background: "#0A2239" }}
    >
      <h1 className="text-3xl font-bold text-white">Knight&apos;s Tour Game</h1>
      <div className="flex items-center gap-4">
        <label className="font-semibold text-white">Select Board Size:</label>
        <div className="flex gap-4">
          {BOARD_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setBoardSize(size)}
              className={`px-4 py-2 rounded transition-colors ${
                boardSize === size
                  ? "bg-[#176087] text-white"
                  : "bg-[#0A2239] text-white border-2 border-[#176087] hover:bg-[#176087]/50 cursor-pointer"
              }`}
            >
              {size} x {size}
            </button>
          ))}
        </div>
      </div>
      <Board
        size={boardSize}
        knightPosition={knightPosition}
        onCellClick={handleCellClick}
        visited={visited}
        validMoves={validMoves}
      />
      <button
        onClick={resetGame}
        className="mt-4 rounded px-4 py-2 text-white font-semibold cursor-pointer"
        style={{ background: "#176087" }}
      >
        Reset Game
      </button>
    </main>
  );
}
