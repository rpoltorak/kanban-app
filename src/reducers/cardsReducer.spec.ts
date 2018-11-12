
import cardsReducer from "./cardsReducer";
import CardModel from "../models/cardModel";
import { createCard, deleteCard, updateCard } from "../actions/cardActions";
import { deleteLane } from "../actions/laneActions";

const card: CardModel = { id: "21", laneId: "1", title: "current title", description: "current description"  };
const otherCard: CardModel = { id: "22", laneId: "1", title: "current title", description: "current description"  };
const updatedCard: CardModel = { id: "21", laneId: "1", title: "updated title", description: "updated description" };

const initialState = cardsReducer(undefined, {} as any);

describe("Cards Reducer", () => {

  describe("snapshot", () => {
    it("should match a snapshot", () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe("card_create", () => {
    it("should add a new card as the first element", () => {
      const action = createCard("title", "description", "1");
      const state = cardsReducer(initialState, action);
      const { id } = action.payload.card;

      expect(state.byId[id]).toEqual(action.payload.card);
      expect(state.allIds).toHaveLength(1);
      expect(state.allIds[0]).toEqual(id);
    });
  });

  describe("card_delete", () => {
    it("should delete existing card with specified id", () => {
      const prevState = {
        ...initialState,
        byId: {
          [card.id]: card,
        },
        allIds: [card.id],
      };

      const action = deleteCard(card.id, card.laneId);
      const nextState = cardsReducer(prevState, action);

      expect(nextState.allIds).toHaveLength(0);
      expect(nextState.byId[card.id]).toBeUndefined();
    });
  });

  describe("card_update", () => {
    it("should update existing card's title and description", () => {
      const prevState = {
        ...initialState,
        byId: {
          [card.id]: card,
        },
        allIds: [card.id],
      };

      const action = updateCard(card.id, { title: "updated title", description: "updated description" });
      const nextState = cardsReducer(prevState, action);

      expect(nextState.byId[card.id]).toEqual(updatedCard);
    });
  });

  describe("lane_delete", () => {
    it("should delete all cards related to deleted lane", () => {
      const prevState = {
        ...initialState,
        byId: {
          [card.id]: card,
          [otherCard.id]: otherCard,
        },
        allIds: [card.id, otherCard.id],
      };

      const action = deleteLane("1");
      const nextState = cardsReducer(prevState, action);

      expect(nextState.byId).toEqual({});
      expect(nextState.allIds).toHaveLength(0);
    });
  });
});
