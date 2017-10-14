/* @flow */
import React from 'react';
import CounterUseCase from '../../usecase/CounterUseCase.js';
import type { Context } from '../../types.js';

type Props = {
  count: number,
  appContext: Context
};

export default class Counter extends React.Component<Props> {

  render() {
    return (
      <div>
        <div>{`${this.props.count}`}</div>
        <button type="button" onClick={this.onAddClick.bind(this)}>+</button>
        <button type="button" onClick={this.onSubClick.bind(this)}>-</button>
      </div>
    );
  }

  onAddClick() {
    this.props.appContext.usecase.execute(CounterUseCase.increment());
  }

  onSubClick() {
    this.props.appContext.usecase.execute(CounterUseCase.decrement());
  }


}
