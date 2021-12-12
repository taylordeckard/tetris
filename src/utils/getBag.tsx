export function getBag (bag?: number[]) {
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
  const shuffled = shuffle(tminoIndices);
  if (bag && shuffled[0] === bag[bag.length - 1]) {
    shuffled.push(shuffled.shift() as number);
  }
  return shuffled;
}
