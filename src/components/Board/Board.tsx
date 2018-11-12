import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { CreateLaneAction, createLane } from "../../actions/laneActions";
import { RootState } from "../../reducers/rootReducer";

import Lane from "../Lane";
import NewLane from "../NewLane";

import "./Board.scss";

interface BoardStateProps {
  lanes: string[];
}

interface BoardDispatchProps {
  createLane: (title: string, description: string) => CreateLaneAction;
}

type BoardProps = BoardStateProps & BoardDispatchProps;

export const Board: React.SFC<BoardProps> = (props: BoardProps) => (
  <div className="board">
    <div className="board__content">
      {props.lanes.map((laneId: string) => (
        <Lane key={laneId} id={laneId} />
      ))}
      <NewLane />
    </div>
  </div>
);

const mapStateToProps = (state: RootState): BoardStateProps => ({
  lanes: state.lanes.allIds,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): BoardDispatchProps => (
  bindActionCreators({
    createLane,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
