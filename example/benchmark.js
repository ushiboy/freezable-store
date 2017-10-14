import createFreezableStore from '../src/index.js';


function execute(test) {
  const start = Date.now();
  test();
  const end = Date.now();
  return end - start;
}

function bench(description, test, times = 10) {
  const results = [];
  for (let i = 0; i < times; i++) {
    results.push(execute(test));
  }
  console.log(`[${description}]`);
  console.log(`  try: ${times}`);
  results.forEach((ms, i) => {
    console.log(`  time[${i+1}]: ${ms}ms`);
  });
  console.log(`  avg: ${results.reduce((r, s) => {
    return r + s;
  }, 0) / results.length}ms`);
}


const ITEM_SIZE = Number(process.env.SIZE  || '100000');
const store = createFreezableStore();
const items = [];

for (let i = 0; i < ITEM_SIZE; i++) {
  items.push({
    index: i
  });
}

bench('assign first items', () => {
  store.assign({
    items
  });
}, 1);

bench('assign other object', () => {
  store.assign({
    other: {
      msg: 'hello'
    }
  });
});


bench('assign same items', () => {
  store.assign({
    items
  });
});

const another = [].concat(store.state.items);
another[0] = {
  index: ITEM_SIZE + 100
};

bench('assign 1 item change', () => {
  store.assign({
    items: another
  });
});
