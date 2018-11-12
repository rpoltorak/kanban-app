import React from "react";
import { shallow } from "enzyme";

import Editable from "../Editable";
import { NewCard } from "../NewCard/NewCard";

describe("NewCard Component", () => {
  test("to match snapshot", () => {
    const newCard = shallow(
      <NewCard laneId={"1"} createCard={jest.fn()} />,
    );

    expect(newCard).toMatchSnapshot();
  });

  test("should render correctly when passed props", () => {
    const newCard = shallow(
      <NewCard laneId={"1"} createCard={jest.fn()} />,
    );

    expect(newCard.find(".btn--new-card").exists()).toBe(true);
  });

  test("should render correctly when changed clicked to new-card button", () => {
    const newCard = shallow(
      <NewCard laneId={"1"} createCard={jest.fn()} />,
    );

    newCard.find(".btn--new-card").simulate("click");

    expect(newCard.find(".btn--save").exists()).toBe(true);
    expect(newCard.find(".btn--cancel").exists()).toBe(true);
    expect(newCard.find(Editable).length).toBe(2);
  });

  test("should call createCard function after click on save button", () => {
    const spyOnCreateCard = jest.fn();

    const newCard = shallow(
      <NewCard laneId={"1"} createCard={spyOnCreateCard} />,
    );

    newCard.setState({ editMode: true });

    newCard.find(".btn--save").simulate("focus");

    expect(spyOnCreateCard).toHaveBeenCalled();
  });

  test("should reset state after click on cancel button", () => {
    const initialState = {
      title: "",
      description: "",
      editMode: false,
    };

    const newCard = shallow(
      <NewCard laneId={"1"} createCard={jest.fn()} />,
    );

    newCard.setState({ editMode: true });

    newCard.find(".btn--cancel").simulate("click");

    expect(newCard.state()).toEqual(initialState);
  });
});
