/* @flow */
import type { CounterRepository, CounterData } from '../domain/Counter.js';

var count = 0;

export default class LocalCounterRepository implements CounterRepository {

  load(): Promise<CounterData> {
    return Promise.resolve({
      count
    });
  }

  increment(): Promise<CounterData> {
    count++;
    return Promise.resolve({
      count
    });
  }

  decrement(): Promise<CounterData> {
    count--;
    return Promise.resolve({
      count
    });
  }

}
