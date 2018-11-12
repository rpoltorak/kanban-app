import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { DeleteLaneAction, deleteLane, updateLane, UpdateLaneAction } from "../../actions/laneActions";
import { RootState } from "../../reducers/rootReducer";
import { getLaneById } from "../../selectors/lanesSelector";

import NewCard from "../NewCard";
import Card from "../Card";
import Editable from "../Editable/Editable";

import "./Lane.scss";

interface LaneOwnProps {
  id: string;
}

interface LaneStateProps {
  title: string;
  cards: string[];
}

interface LaneDispatchProps {
  deleteLane: () => DeleteLaneAction;
  updateTitle: (title: string) => UpdateLaneAction;
}

type LaneProps = LaneOwnProps & LaneStateProps & LaneDispatchProps;

export const Lane: React.SFC<LaneProps> = (props: LaneProps) => (
  <div className="lane">
    <div className="lane__title">
      <Editable value={props.title} placeholder="title" onChange={props.updateTitle}></Editable>
      <button className="btn--delete" onClick={props.deleteLane}>&times;</button>
    </div>
    <div>
      {props.cards.map((cardId: string) => <Card key={cardId} id={cardId} laneId={props.id} />)}
    </div>
    <NewCard laneId={props.id} />
  </div>
);

const mapStateToProps = (state: RootState, ownProps: LaneOwnProps): LaneStateProps => {
  const { title, cards } = getLaneById(state, ownProps.id);

  return { title, cards };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: LaneOwnProps): LaneDispatchProps => (
  bindActionCreators({
    deleteLane: () => deleteLane(ownProps.id),
    updateTitle: (title: string) => updateLane(ownProps.id, { title }),
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lane);
