export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  boardSize: number;
  knightPosition: Position;
  visited: Record<string, number>;
}
