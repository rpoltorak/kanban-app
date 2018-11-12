import React from "react";
import { shallow, mount } from "enzyme";

import Editable from "./Editable";

const value = "example value";

describe("Editable Component", () => {
  test("to match snapshot", () => {
    const editable = shallow(
      <Editable
        value={value}
        placeholder="value"
        onChange={jest.fn()}
        minLength={1}
        maxLength={5}
        autoFocus
      />,
    );

    expect(editable).toMatchSnapshot();
  });

  test("should render correctly when passed props", () => {
    const editable = mount(
      <Editable
        value={value}
        placeholder="value"
        onChange={jest.fn()}
        minLength={1}
        maxLength={5}
        autoFocus
      />,
    );

    const editableInput = editable.find(".editable__input");

    expect(editableInput.exists()).toBe(true);
    expect(editableInput.text()).toEqual(value);
  });

  test("should display error when passed value doesn't meet the requirements", () => {
    const maxLength = 5;

    const editable = mount(
      <Editable
        value={value}
        placeholder="value"
        onChange={jest.fn()}
        minLength={1}
        maxLength={maxLength}
        autoFocus
      />,
    );

    expect(editable.find(".error").exists()).toBe(true);

    editable.setState({ value: "" });

    expect(editable.find(".error").exists()).toBe(true);
  });

  test("should display counter with proper values when changing value", () => {
    const maxLength = 5;
    const nextValue = "12";

    const editable = mount(
      <Editable
        placeholder="value"
        onChange={jest.fn()}
        minLength={1}
        maxLength={maxLength}
        autoFocus
      />,
    );

    editable.setState({ value: "12" });

    const editableCounter = editable.find(".editable__counter");

    expect(editableCounter.exists()).toBe(true);
    expect(editableCounter.text()).toBe(`${nextValue.length}/${maxLength}`);
  });
});
