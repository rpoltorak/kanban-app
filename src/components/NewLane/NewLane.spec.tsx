import React from "react";
import { shallow } from "enzyme";

import Editable from "../Editable";
import { NewLane } from "../NewLane/NewLane";

describe("NewLane Component", () => {
  test("to match snapshot", () => {
    const newLane = shallow(
      <NewLane createLane={jest.fn()} />,
    );

    expect(newLane).toMatchSnapshot();
  });

  test("should render correctly when passed props", () => {
    const newLane = shallow(
      <NewLane createLane={jest.fn()} />,
    );

    expect(newLane.find(".btn--new-lane").exists()).toBe(true);
  });

  test("should render correctly when changed clicked to new-card button", () => {
    const newLane = shallow(
      <NewLane createLane={jest.fn()} />,
    );

    newLane.find(".btn--new-lane").simulate("click");

    expect(newLane.find(".btn--save").exists()).toBe(true);
    expect(newLane.find(".btn--cancel").exists()).toBe(true);
    expect(newLane.find(Editable).length).toBe(1);
  });

  test("should call createLane function after click on save button", () => {
    const spyOnCreateLane = jest.fn();

    const newLane = shallow(
      <NewLane createLane={spyOnCreateLane} />,
    );

    newLane.setState({ editMode: true });

    newLane.find(".btn--save").simulate("focus");

    expect(spyOnCreateLane).toHaveBeenCalled();
  });

  test("should reset state after click on cancel button", () => {
    const initialState = {
      title: "",
      editMode: false,
    };

    const newLane = shallow(
      <NewLane createLane={jest.fn()} />,
    );

    newLane.setState({ editMode: true });

    newLane.find(".btn--cancel").simulate("click");

    expect(newLane.state()).toEqual(initialState);
  });
});
