import { Action } from "redux";
import uuid from "uuid";

import CardModel from "../models/cardModel";

export enum CardActionTypes {
  CARD_CREATE = "CARD_CREATE",
  CARD_DELETE = "CARD_DELETE",
  CARD_UPDATE = "CARD_UPDATE",
}

export type CardAction = CreateCardAction | DeleteCardAction | UpdateCardAction;

export interface CreateCardAction extends Action {
  type: CardActionTypes.CARD_CREATE;
  payload: {
    card: CardModel;
  };
}

export interface DeleteCardAction extends Action {
  type: CardActionTypes.CARD_DELETE;
  payload: {
    cardId: string;
    laneId: string;
  };
}

export interface UpdateCardAction extends Action {
  type: CardActionTypes.CARD_UPDATE;
  payload: {
    cardId: string;
    changes: Partial<CardModel>;
  };
}

export function createCard(title: string, description: string, laneId: string): CreateCardAction {
  return {
    type: CardActionTypes.CARD_CREATE,
    payload: {
      card: {
        id: uuid.v4(),
        laneId,
        title,
        description,
      },
    },
  };
}

export function deleteCard(cardId: string, laneId: string): DeleteCardAction {
  return {
    type: CardActionTypes.CARD_DELETE,
    payload: {
      cardId,
      laneId,
    },
  };
}

export function updateCard(cardId: string, changes: Partial<CardModel>): UpdateCardAction {
  return {
    type: CardActionTypes.CARD_UPDATE,
    payload: {
      cardId,
      changes,
    },
  };
}
