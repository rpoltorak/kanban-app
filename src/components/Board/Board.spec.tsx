import React from "react";
import { shallow } from "enzyme";

import { Board } from "./Board";
import NewLane from "../NewLane";
import Lane from "../Lane";

const lanes = ["1", "2", "3"];

describe("Board Component", () => {
  test("to match snapshot", () => {
    const board = shallow(
      <Board lanes={lanes} createLane={jest.fn()} />,
    );

    expect(board).toMatchSnapshot();
  });

  test("should render correctly when passed props", () => {
    const board = shallow(
      <Board lanes={lanes} createLane={jest.fn()} />,
    );

    expect(board.find(".board").exists()).toBe(true);
    expect(board.find(".board__content").exists()).toBe(true);
    expect(board.find(NewLane).exists()).toBe(true);
    expect(board.find(Lane).length).toBe(lanes.length);
  });
});
