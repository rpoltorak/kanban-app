import React from "react";

import "./Editable.scss";

interface EditableProps {
  value: string;
  placeholder?: string;
  autoFocus?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange: (value: string) => void;
}

interface EditableState {
  value: string;
  isEdited: boolean;
  isError: boolean;
}

export default class Editable extends React.PureComponent<EditableProps, EditableState> {
  public static defaultProps = {
    value: "",
  };

  public state = {
    value: this.props.value,
    isEdited: !this.props.value,
    isError: false,
  };

  public ref = React.createRef<HTMLDivElement>();

  public componentDidMount = () => {
    if (this.ref.current) {
      this.ref.current.innerHTML = this.state.value;
      this.checkErrors();
      if (this.props.autoFocus) {
        this.ref.current.focus();
      }
    }
  }

  public toggleEdit = () => this.setState((state: EditableState) => ({ isEdited: !state.isEdited }));

  public save = () => {
    this.toggleEdit();
    this.props.onChange(this.state.value);
  }

  public reset = () => this.setState((state: EditableState) => ({ value: this.props.value }));

  public handleBlur = async (event: React.FocusEvent<HTMLDivElement>) => {
    event.persist();

    await this.checkErrors();

    if (!this.ref.current) {
      return;
    }

    if (this.state.isError) {
      event.preventDefault();
      this.ref.current.focus();
    } else {
      this.props.onChange(this.ref.current.innerHTML);
      this.save();
    }
  }

  public checkErrors = () => {
    this.setState((state: EditableState) => ({
      isError: (!!this.props.minLength && state.value.length < this.props.minLength) ||
        (!!this.props.maxLength && state.value.length >= this.props.maxLength),
    }));
  }

  public handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    const { innerText } = event.target as HTMLElement;

    this.setState((state: EditableState) => ({ value: innerText }), this.checkErrors);
  }

  public renderCounter = () => {
    return this.props.maxLength && this.state.isEdited && (
      <div className="editable__counter">
        {this.state.value.length}/{this.props.maxLength}
      </div>
    );
  }

  public render() {
    return (
      <div className={this.state.isError ? "editable__wrapper error" : "editable__wrapper"}>
        <div
          contentEditable={true}
          className="editable__input"
          ref={this.ref}
          placeholder={this.props.placeholder}
          defaultValue={this.state.value}
          onInput={this.handleChange}
          onBlur={this.handleBlur}
        />
        {this.renderCounter()}
      </div>
    );
  }
}
