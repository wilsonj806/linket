import { makeActionCreator, createReducer } from "./reducerFactory";

describe("A factory function for creating action objects", () => {
  it("returns a function", () => {
    expect(typeof makeActionCreator("TEST")).toBe("function");
  });

  it("returns a plain object with a type key and keys corresponding to the inputs when the returned function is invoked", () => {
    const testKey = "test";
    const testKey2 = "test2";
    const type = "TEST";
    const initFactory = makeActionCreator(type, testKey, testKey2);

    const actionUnderTest = initFactory();

    expect(actionUnderTest).toHaveProperty(testKey);
    expect(actionUnderTest).toHaveProperty(testKey2);
  });
});

describe("A factory function for creating a reducer", () => {
  it("returns a function", () => {
    expect(typeof createReducer({}, {})).toBe("function");
  });

  it("returns updated state when invoked", () => {
    const initState = 0;
    const handlers = {
      COUNT_UP: (state, action) => state + 1,
    };
    const reducer = createReducer(initState, handlers);
    const assertState = reducer(initState, { type: "COUNT_UP" });

    expect(assertState).toBe(1);
  });
});
