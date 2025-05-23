import { Position } from "./types";
import { KNIGHT_MOVES } from "./constants";

export const isValidKnightMove = (from: Position, to: Position): boolean => {
  const dr = Math.abs(to.row - from.row);
  const dc = Math.abs(to.col - from.col);
  return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
};

export const isGameOver = (
  position: Position,
  visited: Record<string, number>,
  boardSize: number
): boolean => {
  return KNIGHT_MOVES.every(([dr, dc]) => {
    const r = position.row + dr;
    const c = position.col + dc;
    const key = `${r}-${c}`;
    const isInBounds = r >= 0 && r < boardSize && c >= 0 && c < boardSize;
    return !isInBounds || key in visited;
  });
};

export const getValidMoves = (
  knightPosition: Position,
  visited: Record<string, number>,
  boardSize: number
): string[] => {
  return Array.from({ length: boardSize * boardSize }, (_, i) => {
    const row = Math.floor(i / boardSize);
    const col = i % boardSize;
    const key = `${row}-${col}`;

    return (
      isValidKnightMove(knightPosition, { row, col }) &&
      !(key in visited) &&
      key
    );
  }).filter(Boolean) as string[];
};
