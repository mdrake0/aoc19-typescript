// Puzzle input: 254032-789860
const rangeLowerBound = 254032;
const rangeUpperBound = 789860;

function hasSixDigits(num: number): boolean {
  return num >= 100_000 && num < 1_000_000;
}

function hasSameDigitAdjacent(num: number): boolean {
  let rightmostDigit = num % 10;
  num = Math.floor(num / 10);
  let nextDigit = num % 10;

  while (num > 0) {
    if (rightmostDigit === nextDigit) {
      return true;
    }
    rightmostDigit = nextDigit;
    num = Math.floor(num / 10);
    nextDigit = num % 10;
  }
  return false;
}

function hasOnlyTwoSameDigitsAdjacent(num: number): boolean {
  let rightmostDigit = num % 10;
  num = Math.floor(num / 10);
  let nextDigit = num % 10;
  let validMatch = false;
  let lastPairMatched = false;

  while (num > 0) {
    if (rightmostDigit !== nextDigit && validMatch) {
      return true;
    } else if (rightmostDigit !== nextDigit) {
      lastPairMatched = false;
    } else if (rightmostDigit === nextDigit && lastPairMatched) {
      validMatch = false;
    } else {
      validMatch = true;
      lastPairMatched = true;
    }
    rightmostDigit = nextDigit;
    num = Math.floor(num / 10);
    nextDigit = num % 10;
  }
  return validMatch;
}

function neverDecreases(num: number): boolean {
  let rightmostDigit = num % 10;
  num = Math.floor(num / 10);
  let nextDigit = num % 10;

  while (num > 0) {
    if (rightmostDigit < nextDigit) {
      return false;
    }
    rightmostDigit = nextDigit;
    num = Math.floor(num / 10);
    nextDigit = num % 10;
  }
  return true;
}

function part1(): number {
  let candidates = 0;
  for (let i = rangeLowerBound; i < rangeUpperBound; ++i) {
    if (hasSixDigits(i) && hasSameDigitAdjacent(i) && neverDecreases(i)) {
      candidates++;
    }
  }
  return candidates;
}

function part2(): number {
  let candidates = 0;
  for (let i = rangeLowerBound; i <= rangeUpperBound; ++i) {
    if (
      hasSixDigits(i) &&
      hasSameDigitAdjacent(i) &&
      hasOnlyTwoSameDigitsAdjacent(i) &&
      neverDecreases(i)
    ) {
      candidates++;
    }
  }
  return candidates;
}

export { part1, part2 };
