import React from "react";
import { shallow } from "enzyme";

import { Card } from "./Card";
import Editable from "../Editable";

describe("Card Component", () => {
  test("to match snapshot", () => {
    const card = shallow(
      <Card
        id={"21"}
        laneId={"1"}
        title="some title"
        description="some description"
        deleteCard={jest.fn()}
        updateTitle={jest.fn()}
        updateDescription={jest.fn()}
      />,
    );

    expect(card).toMatchSnapshot();
  });

  test("should render correctly when passed props", () => {
    const card = shallow(
      <Card
        id={"21"}
        laneId={"1"}
        title="some title"
        description="some description"
        deleteCard={jest.fn()}
        updateTitle={jest.fn()}
        updateDescription={jest.fn()}
      />,
    );

    expect(card.find(".card").exists()).toBe(true);
    expect(card.find(".btn--delete").exists()).toBe(true);
    expect(card.find(Editable).length).toBe(2);
  });

  test("should call deleteCard function after click on delete button", () => {
    const spyOnDeleteCard = jest.fn();
    const card = shallow(
      <Card
        id={"21"}
        laneId={"1"}
        title="some title"
        description="some description"
        deleteCard={spyOnDeleteCard}
        updateTitle={jest.fn()}
        updateDescription={jest.fn()}
      />,
    );

    card.find(".btn--delete").simulate("click");

    expect(spyOnDeleteCard).toHaveBeenCalled();
  });
});
