"use client";

export default function Board({ size = 6 }: { size?: number }) {
  const cells = Array.from({ length: size * size }, (_, i) => i);

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size}, 64px)`,
        gridTemplateRows: `repeat(${size}, 64px)`,
      }}
    >
      {cells.map((cell, index) => {
        const row = Math.floor(index / size);
        const col = index % size;
        const isDark = (row + col) % 2 === 1;

        return (
          <div
            key={index}
            className={`w-16 h-16 border ${
              isDark ? "bg-gray-700" : "bg-white"
            }`}
          />
        );
      })}
    </div>
  );
}
