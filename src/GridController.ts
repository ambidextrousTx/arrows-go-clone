type Direction = { x: 0 | 1 | -1; y: 0 | 1 | -1 }

interface Arrow {
  id: string;
  // Index 0 is the head, index length - 1 is the tail
  cells: Array<{ x: number, y: number}>;
  direction: Direction;
  status: 'idle' | 'moving' | 'escaping' | 'colliding';
}

class GridController {

  occupancyMap: Map<string, string | undefined>;
  width: number;
  height: number;
  arrows: Array<Arrow>;

  constructor() {
    this.width = 100;
    this.height = 100;
    this.occupancyMap = this.generateOccupancyMap(this.width, this.height);
    this.arrows = [];
  }

  private advanceSnake(arrow: Arrow, newHead: { x: number; y: number }): void {
  // A. Get the old tail before we alter the array
  const oldTail = arrow.cells[arrow.cells.length - 1];

  // B. Free up the old tail position in the map
  this.occupancyMap.delete(`${oldTail.x},${oldTail.y}`);

  // C. Update snake cells (Shift everything forward)
  arrow.cells.pop(); // Remove tail
  arrow.cells.unshift(newHead); // Add new head

  // D. Claim the new head position in the map
  this.occupancyMap.set(`${newHead.x},${newHead.y}`, arrow.id);
  }

  moveArrow(arrowId: string): void {
    let arrow = this.arrows.find(x => x.id === arrowId);
    if (arrow !== undefined) {
      let nextHeadPositionX = arrow.cells[0].x + arrow.direction.x;
      let nextHeadPositionY = arrow.cells[0].y + arrow.direction.y;
      let position = `${nextHeadPositionX},${nextHeadPositionY}`

      // 1. First, check bounds before reading the occupancy map
      const isOutOfBounds = 
        nextHeadPositionX < 0 || nextHeadPositionX >= this.width||
        nextHeadPositionY < 0 || nextHeadPositionY >= this.height;

      if (isOutOfBounds) {
        // Arrow is escaping!
        this.handleEscapeStep(arrow);
        return;
      }

      let mapStatus = this.occupancyMap.get(position);
      // 2. If inside bounds, check occupancy map
      switch (mapStatus) {
        case undefined:
          // Cell is EMPTY -> Advance body forward by 1 step
          this.advanceSnake(arrow, { x: nextHeadPositionX, y: nextHeadPositionY });
          break;

        case arrow.id:
          // Wait, can a head hit its own body? 
          // Only if it's moving into its own tail cell as the tail leaves!
          // For straight-line movement, treat as empty if it's the current tail cell.
          this.advanceSnake(arrow, { x: nextHeadPositionX, y: nextHeadPositionY });
          break;

        default:
          // It's another arrow's ID! -> COLLISION!
          this.handleCollision(arrow);
          break;
      }
      switch (mapStatus) {
        // cases
      }
      // updateOccupancyMap
    }
  }

  generateOccupancyMap(width: number, height: number): Map<string, string | undefined> {
    const occupancyMap = new Map<string, string | undefined>();
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        occupancyMap.set(`${i},${j}`, "")
      }
    }

    return occupancyMap;
  }

  canEscape(arrowId: string) {

  }
}
