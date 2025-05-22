"use client";

type Props = {
  size?: number;
  knightPosition: { row: number; col: number };
  onCellClick: (row: number, col: number) => void;
  visited: Record<string, number>;
};

export default function Board({
  size = 6,
  knightPosition,
  onCellClick,
  visited,
}: Props) {
  const cells = Array.from({ length: size * size }, (_, i) => i);

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size}, 64px)`,
        gridTemplateRows: `repeat(${size}, 64px)`,
      }}
    >
      {cells.map((_, index) => {
        const row = Math.floor(index / size);
        const col = index % size;
        const isDark = (row + col) % 2 === 1;
        const isKnight =
          knightPosition.row === row && knightPosition.col === col;
        const isVisited = `${row}-${col}` in visited;
        const step = visited[`${row}-${col}`];

        return (
          <div
            key={index}
            className={`w-16 h-16 border flex items-center justify-center text-4xl cursor-pointer
              ${isDark ? "bg-gray-700" : "bg-white"}
            `}
            onClick={() => onCellClick?.(row, col)}
          >
            {isKnight ? "♞" : isVisited ? step : ""}
          </div>
        );
      })}
    </div>
  );
}
