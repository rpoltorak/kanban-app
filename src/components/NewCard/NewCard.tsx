
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { createCard, CreateCardAction } from "../../actions/cardActions";
import Editable from "../Editable";

import "../Card/Card.scss";
import "./NewCard.scss";

interface NewCardOwnProps {
  laneId: string;
}

interface NewCardDispatchProps {
  createCard: (title: string, description: string, laneId: string) => CreateCardAction;
}

type NewCardProps = NewCardOwnProps & NewCardDispatchProps;

interface NewCardState {
  title: string;
  description: string;
  editMode: boolean;
}

const initialState = {
  title: "",
  description: "",
  editMode: false,
};

export class NewCard extends React.Component<NewCardProps, NewCardState> {
  public state = Object.assign({}, initialState);

  public toggleEditMode = () => this.setState((state: NewCardState) => ({ editMode: !state.editMode}));

  public reset = () => this.setState((state: NewCardState) => Object.assign({}, initialState));

  public updateStateFragment = (fieldName: string) => (value: string): void => (
    this.setState((state: NewCardState) => ({...state, [fieldName]: value }))
  )

  public handleCreate = () => {
    const { title, description } = this.state;

    this.reset();
    this.props.createCard(title, description, this.props.laneId);
  }

  public renderEditMode = () => (
    <>
      <div className="card">
        <Editable
          placeholder="title"
          onChange={this.updateStateFragment("title")}
          minLength={1}
          autoFocus
        />
        <Editable placeholder="description" onChange={this.updateStateFragment("description")} />
      </div>
      <div className="lane__new-card">
        <button className="btn btn--save" onFocus={this.handleCreate}>SAVE</button>
        <button className="btn btn--cancel" onClick={this.reset}>CANCEL</button>
      </div>
    </>
  )

  public renderCreateButton = () => (
    <button className="btn btn--new-card" onClick={this.toggleEditMode}>+ Add new card...</button>
  )

  public render = () => this.state.editMode ? this.renderEditMode() : this.renderCreateButton();
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): NewCardDispatchProps => (
  bindActionCreators({
    createCard,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(NewCard);
