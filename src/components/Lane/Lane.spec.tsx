import React from "react";
import { shallow } from "enzyme";

import { Lane } from "./Lane";
import Editable from "../Editable";
import NewCard from "../NewCard";
import Card from "../Card";

const cards = ["21", "22", "23"];

describe("Lane Component", () => {
  test("to match snapshot", () => {
    const lane = shallow(
      <Lane
        id={"1"}
        title="some title"
        cards={cards}
        deleteLane={jest.fn()}
        updateTitle={jest.fn()}
      />,
    );

    expect(lane).toMatchSnapshot();
  });

  test("should render correctly when passed props", () => {
    const lane = shallow(
      <Lane
        id={"1"}
        title="some title"
        cards={cards}
        deleteLane={jest.fn()}
        updateTitle={jest.fn()}
      />,
    );

    expect(lane.find(".lane").exists()).toBe(true);
    expect(lane.find(".btn--delete").exists()).toBe(true);
    expect(lane.find(Card).length).toBe(cards.length);
    expect(lane.find(NewCard).length).toBe(1);
    expect(lane.find(Editable).length).toBe(1);
  });

  test("should call deleteLane function after click on delete button", () => {
    const spyOnDeleteLane = jest.fn();

    const lane = shallow(
      <Lane
        id={"1"}
        title="some title"
        cards={cards}
        deleteLane={spyOnDeleteLane}
        updateTitle={jest.fn()}
      />,
    );

    lane.find(".btn--delete").simulate("click");

    expect(spyOnDeleteLane).toHaveBeenCalled();
  });
});
