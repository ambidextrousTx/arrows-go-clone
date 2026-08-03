type Direction = { x: 0 | 1 | -1; y: 0 | 1 | -1 }

interface Arrow {
  id: string;
  // Index 0 is the head, index length - 1 is the tail
  cells: Array<{ x: number, y: number}>;
  direction: Direction;
  status: 'idle' | 'moving' | 'escaping' | 'colliding';
}

class GridController {

  occupancyMap: Map<string, boolean>;
  width: number;
  height: number;
  arrows: Array<Arrow>;

  constructor() {
    this.width = 100;
    this.height = 100;
    this.occupancyMap = this.generateOccupancyMap(this.width, this.height);
    this.arrows = [];
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

  generateOccupancyMap(width: number, height: number): Map<string, boolean> {
    const occupancyMap = new Map<string, boolean>();
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        occupancyMap.set(`${i},${j}`, false)
      }
    }

    return occupancyMap;
  }

  canEscape(arrowId: string) {

  }
}
