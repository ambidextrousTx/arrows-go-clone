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
    this.occupancyMap = generateOccupancyMap(this.width, this.height);
    this.arrows = [];
  }

  function moveArrow(arrowId: string): void {
    let arrow = this.arrows.find(x => x.id === arrowId);
    let nextHeadPosition = arrow.cells[0] + arrow.direction;
    let mapStatus = this.occupancyMap.get(nextHeadPosition);
    switch (mapStatus) {
      // cases
    }
    // updateOccupancyMap
  }

  function generateOccupancyMap(width: number, height: number): Map<string, boolean> {
    const occupancyMap = new Map<string, boolean>();
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        occupancyMap.set(`${i},${j}`, false)
      }
    }

    return occupancyMap;
  }

  function canEscape(arrowId: string) {

  }
}
