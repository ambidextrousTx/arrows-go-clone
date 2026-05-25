function moveArrow(arrowId: string) {

}

function generateOccupancyMap(width: number, height: number): Map<string, boolean> {
  const occupancyMap = new Map<string, boolean>();
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      occupancyMap.set(`${i},${j}`, false)
    }

    return occupancyMap;
  }
}

function checkCollision(arrowId: string) {

}
