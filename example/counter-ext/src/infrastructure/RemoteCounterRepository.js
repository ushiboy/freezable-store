/* @flow */
import type { CounterRepository, CounterData } from '../domain/Counter.js';

export default class RemoteCounterRepository implements CounterRepository {

  load(): Promise<CounterData> {
    return fetch('/api/count').then(r => r.json()).then(({ count }) => ({ count }));
  }

  increment(): Promise<CounterData> {
    return fetch('/api/vote', {
      method: 'POST'
    }).then(r => r.json()).then(({ count }) => ({ count }));
  }

  decrement(): Promise<CounterData> {
    return fetch('/api/vote', {
      method: 'DELETE'
    }).then(r => r.json()).then(({ count }) => ({ count }));
  }

}
