/* @flow */
import type { AppStore, UseCase } from '../types.js';
import type { CounterRepository } from '../domain/Counter.js';
import Counter from '../domain/Counter.js';

const CounterUseCase = {

  increment(): UseCase {
    return (store: AppStore, counterRepository: CounterRepository) => {
      const counter = new Counter(counterRepository, store.state);
      counter.increment().then(() => {
        store.assign({
          count: counter.count
        });
      });
    };
  },

  decrement(): UseCase {
    return (store: AppStore, counterRepository: CounterRepository) => {
      const counter = new Counter(counterRepository, store.state);
      counter.decrement().then(() => {
        store.assign({
          count: counter.count
        });
      });
    };
  }

};

export default CounterUseCase;
