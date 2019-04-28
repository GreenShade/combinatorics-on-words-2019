export default function algoXXX(word) {
  function matches(start, lengthX) {
    const part1 = word.substring(start + 0 * lengthX, start + 1 * lengthX);
    const part2 = word.substring(start + 1 * lengthX, start + 2 * lengthX);
    const part3 = word.substring(start + 2 * lengthX, start + 3 * lengthX);

    return part1 === part2 && part2 === part3;
  }

  for (let i = 0; i < word.length; i++) {
    for (let len = 1; len < word.length; len++) {
      if (matches(i, len))
        return {start: i, length: len};
    }
  }

  return {};
}