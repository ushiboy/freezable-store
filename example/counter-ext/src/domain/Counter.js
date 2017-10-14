/* @flow */
export type CounterData = {
  count: number
};

export default class Counter {

  count: number;
  _repository: CounterRepository;

  constructor(repository: CounterRepository, data: ?CounterData) {
    this._repository = repository;
    if (data) {
      this.count = data.count;
    }
  }

  load(): Promise<void> {
    return this._repository.load().then(({ count }) => {
      this.count = count;
    });
  }

  increment(): Promise<void> {
    return this._repository.increment().then(({ count }) => {
      this.count = count;
    });
  }

  decrement(): Promise<void> {
    return this._repository.decrement().then(({ count }) => {
      this.count = count;
    });
  }

}

export interface CounterRepository {

  load(): Promise<CounterData>;

  increment(): Promise<CounterData>;

  decrement(): Promise<CounterData>;

}
