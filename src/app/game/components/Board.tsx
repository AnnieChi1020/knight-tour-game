"use client";

type Props = {
  size?: number;
  knightPosition: { row: number; col: number };
  onCellClick: (row: number, col: number) => void;
  visited: Record<string, number>;
  validMoves: string[];
};

export default function Board({
  size = 6,
  knightPosition,
  onCellClick,
  visited,
  validMoves,
}: Props) {
  const cells = Array.from({ length: size * size }, (_, i) => i);

  return (
    <div
      className="grid p-2"
      style={{
        gridTemplateColumns: `repeat(${size}, 64px)`,
        gridTemplateRows: `repeat(${size}, 64px)`,
        backgroundColor: "#176087",
      }}
    >
      {cells.map((_, index) => {
        const row = Math.floor(index / size);
        const col = index % size;
        const isDark = (row + col) % 2 === 1;

        const isKnight =
          knightPosition.row === row && knightPosition.col === col;

        const key = `${row}-${col}`;
        const isVisited = `${key}` in visited;
        const isHint = validMoves.includes(key);

        return (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center text-2xl cursor-pointer
              ${isKnight ? "text-4xl" : isVisited ? "" : ""}
            `}
            style={{
              background: isHint ? "#9c8f41" : isDark ? "#0A2239" : "#fff",
              color: isHint && isDark ? "#fff" : "#0A2239",
            }}
            onClick={() => onCellClick?.(row, col)}
          >
            {isKnight ? "♞" : isVisited ? visited[`${key}`] : ""}
          </div>
        );
      })}
    </div>
  );
}
