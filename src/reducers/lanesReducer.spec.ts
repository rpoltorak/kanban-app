
import lanesReducer from "./lanesReducer";
import LaneModel from "../models/laneModel";
import { createLane, deleteLane, updateLane } from "../actions/laneActions";
import CardModel from "../models/cardModel";
import { createCard, deleteCard } from "../actions/cardActions";

const lane: LaneModel = { id: "1", title: "current title", cards: ["21", "22"]  };
const otherLane: LaneModel = { id: "2", title: "current title", cards: [] };
const updatedLane: LaneModel = { id: "1", title: "updated title", cards: ["21", "22"] };

const initialState = lanesReducer(undefined, {} as any);

describe("Lanes Reducer", () => {

  describe("snapshot", () => {
    it("should match a snapshot", () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe("lane_create", () => {
    it("should add a new lane as the first element", () => {
      const action = createLane("title");
      const state = lanesReducer(initialState, action);
      const { id } = action.payload.lane;

      expect(state.byId[id]).toEqual(action.payload.lane);
      expect(state.allIds).toHaveLength(1);
      expect(state.allIds[0]).toEqual(id);
    });
  });

  describe("lane_delete", () => {
    it("should delete existing lane with specified id", () => {
      const prevState = {
        ...initialState,
        byId: {
          [lane.id]: lane,
        },
        allIds: [lane.id],
      };

      const action = deleteLane(lane.id);
      const nextState = lanesReducer(prevState, action);

      expect(nextState.allIds).toHaveLength(0);
      expect(nextState.byId[lane.id]).toBeUndefined();
    });
  });

  describe("lane_update", () => {
    it("should update existing lane's title and description", () => {
      const prevState = {
        ...initialState,
        byId: {
          [lane.id]: lane,
        },
        allIds: [lane.id],
      };

      const action = updateLane(lane.id, { title: "updated title" });
      const nextState = lanesReducer(prevState, action);

      expect(nextState.byId[lane.id]).toEqual(updatedLane);
    });
  });

  describe("card_create", () => {
    it("should add cardId to related lane", () => {
      const prevState = {
        ...initialState,
        byId: {
          [lane.id]: lane,
        },
        allIds: [lane.id],
      };

      const action = createCard("title", "description", lane.id);
      const nextState = lanesReducer(prevState, action);

      expect(nextState.byId[lane.id].cards[lane.cards.length]).toEqual(action.payload.card.id);
      expect(nextState.byId[lane.id].cards).toHaveLength(lane.cards.length + 1);
    });
  });

  describe("card_delete", () => {
    it("should delete card related to specified lane", () => {
      const prevState = {
        ...initialState,
        byId: {
          [lane.id]: lane,
        },
        allIds: [lane.id],
      };

      const action = deleteCard(lane.cards[0], lane.id);
      const nextState = lanesReducer(prevState, action);

      expect(nextState.byId[lane.id].cards).toHaveLength(lane.cards.length - 1);
    });
  });
});
