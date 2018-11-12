import React from "react";
import { shallow } from "enzyme";

import App from ".";
import Board from "../Board";

describe("App Component", () => {
  test("to match snapshot", () => {
    const app = shallow(
      <App />,
    );

    expect(app).toMatchSnapshot();
  });

  test("should render correctly", () => {
    const app = shallow(
      <App />,
    );

    expect(app.find(Board).exists()).toBe(true);
  });
});
