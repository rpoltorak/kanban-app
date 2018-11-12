import { Action } from "redux";
import uuid from "uuid";

import LaneModel from "../models/laneModel";

export enum LaneActionTypes {
  LANE_CREATE = "LANE_CREATE",
  LANE_DELETE = "LANE_DELETE",
  LANE_UPDATE = "LANE_UPDATE",
}

export type LaneAction = CreateLaneAction | DeleteLaneAction | UpdateLaneAction;

export interface CreateLaneAction extends Action {
  type: LaneActionTypes.LANE_CREATE;
  payload: {
    lane: LaneModel,
  };
}

export interface DeleteLaneAction extends Action {
  type: LaneActionTypes.LANE_DELETE;
  payload: {
    laneId: string,
  };
}

export interface UpdateLaneAction extends Action {
  type: LaneActionTypes.LANE_UPDATE;
  payload: {
    laneId: string;
    changes: Partial<LaneModel>,
  };
}

export function createLane(title: string): CreateLaneAction {
  return {
    type: LaneActionTypes.LANE_CREATE,
    payload: {
      lane: {
        id: uuid.v4(),
        title,
        cards: [],
      },
    },
  };
}

export function deleteLane(laneId: string): DeleteLaneAction {
  return {
    type: LaneActionTypes.LANE_DELETE,
    payload: {
      laneId,
    },
  };
}

export function updateLane(laneId: string, changes: Partial<LaneModel>): UpdateLaneAction {
  return {
    type: LaneActionTypes.LANE_UPDATE,
    payload: {
      laneId,
      changes,
    },
  };
}
