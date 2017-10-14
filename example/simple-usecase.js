const createFreezableStore = require('../lib/index.js').default;

const store = createFreezableStore({
  count: 0
});

const state = store.state;

const observer1 = () => {
  console.log(`change: count:${state.count}`);
};
const observer2 = () => {
  console.log(`(observer 2) change: count:${state.count}`);
};

store.observe(observer1);
store.observe(observer2);

console.log(`count: ${state.count}`); // count: 0;

store.assign({
  count: state.count + 1
});
console.log(`count: ${state.count}`); // count: 1;

try {
  state.count = state.count + 1;  // throw Error
} catch (e) {
  console.log(`${e}`); // Error: Should use assign
}
console.log(`count: ${state.count}`); // count: 1;

store.unobserve(observer2);

store.assign({
  count: state.count + 1
});
console.log(`count: ${state.count}`); // count: 2;
