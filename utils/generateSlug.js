import animals from "./animals";
import adjectives from "./adjectives";

const generateSlug = (animals, adjectives) => {
  if (!Array.isArray(animals) || !Array.isArray(adjectives))
    throw new Error("Expecting inputs to be an array of strings");

  return (rand1 = 0, rand2 = 0, rand3 = 0) => {
    const absRand1 = Math.abs(rand1);
    const absRand2 = Math.abs(rand2);
    const absRand3 = Math.abs(rand3);
    if (rand1 > 1 || rand2 > 1 || rand3 > 1)
      throw new Error("Expecting ALL inputs to be a decimal between 1 to 0");

    const adjInd1 = Math.floor(absRand1 * (adjectives.length - 1));
    const adjInd2 = Math.floor(absRand2 * (adjectives.length - 1));
    const animalInd = Math.floor(absRand3 * (animals.length - 1));

    return `${adjectives[adjInd1]}${adjectives[adjInd2]}${animals[animalInd]}`;
  };
};

const generateRandomSlug = () => {
  const rand1 = Math.random();
  const rand2 = Math.random();
  const rand3 = Math.random();
  return generateSlug(animals, adjectives)(rand1, rand2, rand3);
};
export default generateRandomSlug;

export { generateSlug };
