type Direction = { x: 0 | 1 | -1; y: 0 | 1 | -1 }

interface Arrow {
  id: string;
  // Index 0 is the head, index length - 1 is the tail
  cells: Array<{ x: number, y: number}>;
  direction: Direction;
  status: 'idle' | 'moving' | 'escaping' | 'colliding';
}
