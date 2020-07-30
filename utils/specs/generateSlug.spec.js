import { generateSlug } from "../generateSlug";

describe("A function that generates a url slug", () => {
  const animals = ["shark"];
  const adjectives = ["loud", "baby"];

  it("should generate a slug from the inputs", () => {
    const endStr = "loudbabyshark";

    const expectedStr = generateSlug(animals, adjectives)(0, 1, 0);

    expect(expectedStr).toEqual(endStr);
  });

  it("should throw given bad inputs", () => {
    expect(() => generateSlug(animals, adjectives)(2, 2, 2)).toThrow();
    expect(() => generateSlug(animals, adjectives)("a", 2, [2])).toThrow();
  });
});
