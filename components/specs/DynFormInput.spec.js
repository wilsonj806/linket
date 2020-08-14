import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import DynamicInput from "../DynFormInput";

describe("A dynamic input component", () => {
  it("renders with two labels and two inputs that render with values", () => {
    const testObj = { name: "name", link: "link" };
    const final = [testObj.name, testObj.link].toString();
    const { debug, getAllByRole, getAllByLabelText } = render(
      <DynamicInput
        name={testObj.name}
        link={testObj.link}
        updateStateFn={() => true}
      />
    );
    debug();

    const inputs = getAllByRole("textbox");

    const assertValues = inputs.map((input) => input.value).toString();
    expect(assertValues).toBe(final);
  });

  it("updates the correct input when called", () => {
    const name = "name";
    const link = "link";
    const testStr = "baby shark doo doo doo doo";
    const spy = jest.fn((...args) => args);

    const { getByLabelText } = render(
      <DynamicInput name={name} link={link} updateStateFn={spy} />
    );

    const nameInput = getByLabelText("Link Name");
    const linkInput = getByLabelText("Link URL");
    fireEvent.change(nameInput, { target: { value: testStr } });
    fireEvent.change(linkInput, { target: { value: testStr } });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, testStr, link);
    expect(spy).toHaveBeenNthCalledWith(2, name, testStr);
  });
});
