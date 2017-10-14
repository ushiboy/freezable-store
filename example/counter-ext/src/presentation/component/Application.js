/* @flow */
import type Store from '@ushiboy/freezable-store';
import type { AppStore, AppState } from '../../types.js';
import React from 'react';
import Counter from '../page/Counter.js';

type Props = {
  appContext: any;
  store: AppStore;
};

export default class Application extends React.Component<Props, AppState> {

  constructor(props: Props) {
    super(props);
    const { store } = props;
    store.observe((state) => {
      this.setState(state);
    });
  }

  render() {
    const { store, appContext } = this.props;
    const { state } = store;
    return <Counter count={state.count} appContext={appContext} />;
  }

}
