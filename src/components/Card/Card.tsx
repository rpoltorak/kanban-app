import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { deleteCard, updateCard, DeleteCardAction, UpdateCardAction } from "../../actions/cardActions";
import { RootState } from "../../reducers/rootReducer";
import { getCardById } from "../../selectors/cardsSelector";
import Editable from "../Editable";

import "./Card.scss";

interface CardOwnProps {
  id: string;
  laneId: string;
}

interface CardStateProps {
  title: string;
  description: string;
}

interface CardDispatchProps {
  deleteCard: () => DeleteCardAction;
  updateTitle: (title: string) => UpdateCardAction;
  updateDescription: (description: string) => UpdateCardAction;
}

type CardProps = CardOwnProps & CardStateProps & CardDispatchProps;

export const Card: React.SFC<CardProps> = (props: CardProps) => (
  <div className="card">
    <div className="card__title">
      <Editable
        value={props.title}
        onChange={props.updateTitle}
        minLength={1}
      ></Editable>
    </div>
    <div className="card__description">
      <Editable
        value={props.description}
        onChange={props.updateDescription}
        placeholder="description"
      ></Editable>
    </div>
    <button className="btn--delete" onClick={props.deleteCard}>&times;</button>
  </div>
);

const mapStateToProps = (state: RootState, ownProps: CardOwnProps): CardStateProps => {
  const { title, description } = getCardById(state, ownProps.id);

  return { title, description };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: CardOwnProps): CardDispatchProps => (
  bindActionCreators({
    deleteCard: () => deleteCard(ownProps.id, ownProps.laneId),
    updateTitle: (title: string) => updateCard(ownProps.id, { title }),
    updateDescription: (description: string) => updateCard(ownProps.id, { description }),
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Card);
