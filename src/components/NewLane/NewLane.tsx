import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { createLane, CreateLaneAction } from "../../actions/laneActions";
import Editable from "../Editable";

import "../Lane/Lane.scss";

interface NewLaneDispatchProps {
  createLane: (title: string) => CreateLaneAction;
}

interface NewLaneState {
  title: string;
  editMode: boolean;
}

const initialState = {
  title: "",
  editMode: false,
};

export class NewLane extends React.Component<NewLaneDispatchProps, NewLaneState> {
  public state = Object.assign({}, initialState);

  public updateTitle = (title: string): void => (
    this.setState((state: NewLaneState) => ({ title }))
  )

  public reset = () => this.setState((state: NewLaneState) => Object.assign({}, initialState));

  public handleChange = (title: string) => {
    this.setState((state: NewLaneState) => ({title}));
  }

  public handleCreate = () => {
    this.toggleEditMode();
    this.props.createLane(this.state.title);
  }

  public toggleEditMode = () => this.setState((state: NewLaneState) => ({ editMode: !state.editMode}));

  public renderCreateButton = () => (
    <button className="btn btn--new-lane" onClick={this.toggleEditMode}>+ Add new lane...</button>
  )

  public renderEditMode = () => (
    <div className="lane">
      <Editable
        placeholder="title"
        onChange={this.handleChange}
        maxLength={30}
        minLength={1}
        autoFocus
      ></Editable>
      <button className="btn btn--save" onFocus={this.handleCreate}>SAVE</button>
      <button className="btn btn--cancel" onClick={this.reset}>CANCEL</button>
    </div>
  )

  public render = () => this.state.editMode ? this.renderEditMode() : this.renderCreateButton();
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): NewLaneDispatchProps => (
  bindActionCreators({
    createLane,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(NewLane);
