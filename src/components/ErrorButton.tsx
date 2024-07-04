import { Component } from 'react';
import { ThrowErrorButtonState, ThrowErrorButtonProps } from '../types/ErrorButtonInterfaces';

export default class ThrowErrorButton extends Component<ThrowErrorButtonProps, ThrowErrorButtonState> {
  constructor(props: ThrowErrorButtonProps) {
    super(props);
    this.state = { throwError: false };
  }

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Test error from ThrowErrorButton');
    }

    return <button onClick={this.handleClick}>Throw Error</button>;
  }
}
