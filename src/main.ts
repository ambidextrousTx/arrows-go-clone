type Direction = { x: 0 | 1 | -1; y: 0 | 1 | -1 }

interface Arrow {
  id: string;
  cells: { x: number, y: number}[]
  direction: Direction;
  isEscaping: boolean;
}
