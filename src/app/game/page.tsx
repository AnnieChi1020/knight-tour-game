import Board from "./components/Board";

export default function GamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100">
      <h1 className="text-3xl font-bold">Knight&apos;s Tour Game</h1>
      <Board size={6} />
    </main>
  );
}
