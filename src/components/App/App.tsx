import { hot } from "react-hot-loader";
import React from "react";

import Board from "../Board";

import "./App.scss";

const App: React.SFC<{}> = () => (
  <Board />
);

export default hot(module)(App);
