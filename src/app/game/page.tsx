"use client";

import { useState } from "react";
import Board from "./components/Board";

export default function GamePage() {
  const [knightPosition, setKnightPosition] = useState({ row: 0, col: 0 });

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

    if (isValidKnightMove(knightPosition, to)) {
      setKnightPosition(to);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100">
      <h1 className="text-3xl font-bold">Knight&apos;s Tour Game</h1>
      <Board
        size={6}
        knightPosition={knightPosition}
        onCellClick={handleCellClick}
      />
    </main>
  );
}
