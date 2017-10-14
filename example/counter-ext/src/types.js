/* @flow */
import type { Store } from '@ushiboy/freezable-store';
import type { CounterRepository } from './domain/Counter.js';

export type AppState = {
  count: number;
};

export type AppStore = Store<AppState>;

export type UseCase = (store: AppStore, counterRepository: CounterRepository) => void;

export type Context = {
  usecase: {
    execute(usecase: UseCase): void;
  }
};
