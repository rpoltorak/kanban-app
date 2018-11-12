import { CardActionTypes } from "../actions/cardActions";
import { LaneActionTypes } from "../actions/laneActions";
import { RootAction } from "./rootReducer";
import LaneModel from "../models/laneModel";
import CardModel from "../models/cardModel";

export interface LanesState {
  byId: {
    [laneId: string]: LaneModel;
  };
  allIds: string[];
}

const initialState = {
  byId: {},
  allIds: [],
};

export default (state: LanesState = initialState, action: RootAction) => {
  switch (action.type) {
    case LaneActionTypes.LANE_CREATE:
      return createLane(state, action.payload.lane);

    case LaneActionTypes.LANE_DELETE:
      return deleteLane(state, action.payload.laneId);

    case LaneActionTypes.LANE_UPDATE: {
      const { laneId, changes } = action.payload;
      return updateLane(state, laneId, changes);
    }

    case CardActionTypes.CARD_CREATE:
      return createCard(state, action.payload.card);

    case CardActionTypes.CARD_DELETE:
      return deleteCard(state, action.payload);

    default: return state;
  }
};

function createLane(state: LanesState, lane: LaneModel): LanesState {
  return {
    byId: {
      ...state.byId,
      [lane.id]: lane,
    },
    allIds: [...state.allIds, lane.id],
  };
}

function deleteLane(state: LanesState, laneId: string): LanesState {
  const {[laneId]: deletedLane, ...otherLanes} = state.byId;

  return {
    byId: otherLanes,
    allIds: state.allIds.filter((id: string): boolean => id !== laneId),
  };
}

function updateLane(state: LanesState, laneId: string, changes: Partial<LaneModel>): LanesState {
  const lane = state.byId[laneId];

  return {
    byId: {
      ...state.byId,
      [laneId]: {
        ...lane,
        ...changes,
      },
    },
    allIds: state.allIds,
  };
}

function createCard(state: LanesState, card: CardModel): LanesState {
  const lane = state.byId[card.laneId];

  return {
    byId: {
      ...state.byId,
      [card.laneId]: {
        ...lane,
        cards: [...lane.cards, card.id],
      },
    },
    allIds: state.allIds,
  };
}

function deleteCard(state: LanesState, params: { cardId: string, laneId: string }): LanesState {
  const lane = state.byId[params.laneId];

  return {
    byId: {
      ...state.byId,
      [params.laneId]: {
        ...lane,
        cards: lane.cards.filter((cardId: string) => cardId !== params.cardId),
      },
    },
    allIds: state.allIds,
  };
}
