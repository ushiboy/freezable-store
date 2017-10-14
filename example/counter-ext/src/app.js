/* @flow */
import createFreezableStore from '@ushiboy/freezable-store';
import React from 'react';
import { hydrate } from 'react-dom';
import Application from './presentation/component/Application.js';
import AppContext from './AppContext.js';
import RemoteCounterRepository from './infrastructure/RemoteCounterRepository.js';


function getInitialData() {
  const el = document.querySelector('#initial-data');
  const data = el ? el.getAttribute('data-json') : null;
  return data ? JSON.parse(data) : { count: 0 };
}

const store = createFreezableStore(getInitialData());
const counterRepository = new RemoteCounterRepository();
const appContext = AppContext(store, counterRepository);
hydrate(
  <Application appContext={appContext} store={store} />,
  document.querySelector('#app')
);
