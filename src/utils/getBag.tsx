export function getBag () {
  const tminoIndices = [0, 1, 2, 3, 4, 5, 6];
  function shuffle(array: number[]) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  return shuffle(tminoIndices);
}
