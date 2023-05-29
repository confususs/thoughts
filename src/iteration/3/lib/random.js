export function generatePseudoRandomString(seedValues, length) {
  // Combine the seed values to create a seed
  const seed = seedValues.join("");

  // Define the characters to use in the string
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Set the random seed
  let randomSeed = parseInt(seed);

  // Initialize the result string
  let result = "";

  // Generate the pseudo-random string
  while (result.length < length) {
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    const index = Math.floor((randomSeed / 233280) * characters.length);
    result += characters.charAt(index);
  }

  return result;
}

// Simple pseudo-random number generator with string seed
export function pseudoRandom(seed) {
  let value = 0;
  for (let i = 0; i < seed.length; i += 1) {
    value += seed.charCodeAt(i);
  }
  value *= seed.length;

  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// Shuffle function
export function shuffleArray(array, seed) {
  const random = pseudoRandom(seed);

  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
