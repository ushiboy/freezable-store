export default function createFreezableStore(initState = {}) {
  let lock = false;
  const observers = new Set();

  const proxyHandler = {
    set(state, prop, value) {
      if (!lock) {
        // 直接の操作は即エラーに
        throw new Error('Should use assign');
      }
      state[prop] = wrapProxyIfNeeded(value);
      return true;
    },
    deleteProperty(state, prop) {
      // 直接の削除は拒否
      return false;
    }
  };

  /**
   * productionビルドの切り替え機能を入れるべきか?
   */
  // const rootProxy = process.env.NODE_ENV !== 'production' ? new Proxy({}, proxyHandler) : {};
  const rootProxy = new Proxy({}, proxyHandler);

  function wrapProxyIfNeeded(v) {
    if (Array.isArray(v)) {
      return new Proxy(v.map(wrapProxyIfNeeded), proxyHandler);
    } else if (isObjectOrArray(v)) {
      const p = new Proxy({}, proxyHandler);
      Object.assign(p, v);
      return p;
    }
    return v;
  }

  function assign(...sources) {
    lock = true;
    sources.forEach(s => {
      Object.assign(rootProxy, s);
    });
    lock = false;
    observers.forEach(f => {
      f(rootProxy);
    });
  }

  function observe(o) {
    observers.add(o);
  }

  function unobserve(o) {
    observers.delete(o);
  }

  const store = {
    get state() {
      return rootProxy;
    },
    assign,
    observe,
    unobserve
  };

  // initialize
  store.assign(initState);

  return store;
}

function isDate(val) {
  return val !== undefined && val.constructor === Date;
}

function isObjectOrArray(val) {
  return !isDate(val) && typeof val === 'object';
}
