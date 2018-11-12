import { RootState } from "../reducers/rootReducer";
import LaneModel from "../models/laneModel";

export const getAllLanes = (state: RootState): { [laneId: string]: LaneModel } => state.lanes.byId;
export const getAllLaneIds = (state: RootState): string[] => state.lanes.allIds;
export const getLaneById = (state: RootState, laneId: string): LaneModel => state.lanes.byId[laneId];
