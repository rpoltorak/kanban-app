import { LaneActionTypes } from "../actions/laneActions";
import { CardActionTypes } from "../actions/cardActions";
import { RootAction } from "./rootReducer";
import CardModel from "../models/cardModel";

export interface CardsState {
  byId: {
    [cardId: string]: CardModel;
  };
  allIds: string[];
}

const initialState = {
  byId: {},
  allIds: [],
};

export default (state: CardsState = initialState, action: RootAction) => {
  switch (action.type) {
    case CardActionTypes.CARD_CREATE:
      return createCard(state, action.payload.card);

    case CardActionTypes.CARD_DELETE:
      return deleteCard(state, action.payload.cardId);

    case CardActionTypes.CARD_UPDATE: {
      const { cardId, changes } = action.payload;
      return updateCard(state, cardId, changes);
    }

    case LaneActionTypes.LANE_DELETE:
      return deleteLane(state, action.payload.laneId);

    default: return state;
  }
};

function createCard(state: CardsState, card: CardModel): CardsState {
  return {
    byId: {
      ...state.byId,
      [card.id]: card,
    },
    allIds: [...state.allIds, card.id],
  };
}

function deleteCard(state: CardsState, cardId: string): CardsState {
  const {[cardId]: deletedCard, ...otherCards} = state.byId;

  return {
    byId: otherCards,
    allIds: state.allIds.filter((id: string): boolean => id !== cardId),
  };
}

function updateCard(state: CardsState, cardId: string, changes: Partial<CardModel>): CardsState {
  const card = state.byId[cardId];

  return {
    allIds: state.allIds,
    byId: {
      ...state.byId,
      [cardId]: {
        ...card,
        ...changes,
      },
    },
  };
}

function deleteLane(state: CardsState, laneId: string): CardsState {
  const cards = Object.values(state.byId).filter((card: CardModel) => card.laneId !== laneId);

  return {
    byId: cards.reduce((byId: { [cardId: string]: CardModel }, card: CardModel) => {
      byId[card.id] = card;

      return byId;
    }, {}),
    allIds: cards.map((card: CardModel) => card.id),
  };
}
