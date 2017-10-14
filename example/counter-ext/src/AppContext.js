/* @flow */
import type Store from '@ushiboy/freezable-store';
import type { AppState, UseCase, Context } from './types.js';
import type { CounterRepository } from './domain/Counter.js';

export default function AppContext(store: Store<AppState>, counterRepository: CounterRepository): Context {
  return {
    usecase: {
      execute(usecase: UseCase): void {
        usecase(store, counterRepository);
      }
    }
  };
}
