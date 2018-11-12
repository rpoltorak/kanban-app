import { combineReducers } from "redux";

import { CardAction } from "../actions/cardActions";
import cards, { CardsState } from "./cardsReducer";
import { LaneAction } from "../actions/laneActions";
import lanes, { LanesState } from "./lanesReducer";

export interface RootState {
  cards: CardsState;
  lanes: LanesState;
}

export type RootAction = CardAction | LaneAction;

export default combineReducers({
  cards,
  lanes,
});
