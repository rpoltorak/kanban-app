import { RootState } from "../reducers/rootReducer";
import CardModel from "../models/cardModel";

export const getAllCards = (state: RootState): { [cardId: string]: CardModel } => state.cards.byId;
export const getAllCardIds = (state: RootState): string[] => state.cards.allIds;
export const getCardById = (state: RootState, cardId: string): CardModel => state.cards.byId[cardId];
