const assert = require('power-assert');
import sinon from 'sinon';
import createFreezableStore from '../src';

describe('FreezableStore', () => {

  function testData() {
    return {
      name: 'john',
      age: 50,
      favorite: {
        color: 'red',
        number: 123
      },
      children: [
        { name: 'jack', age: 10 },
        { name: 'maria', age: 7 }
      ],
      positions: [
        [ 1, 2 ],
        [ 3, 4 ],
        [ 5, 6 ],
      ]
    }
  }

  function assertState(s, t) {
    assert(s.name === t.name);
    assert(s.age === t.age);
    assert(s.favorite.color === t.favorite.color);
    assert(s.favorite.number === t.favorite.number);
    assert(s.children.length === t.children.length);
    s.children.forEach((_, i) => {
      assert(s.children[i].name === t.children[i].name);
      assert(s.children[i].age === t.children[i].age);
    });
    assert(s.positions.length === t.positions.length);
    s.positions.forEach((_, i) => {
      assert(s.positions[i][0] === t.positions[i][0]);
      assert(s.positions[i][1] === t.positions[i][1]);
      assert(s.positions[i].length === t.positions[i].length);
    });
  }

  describe('状態初期化', () => {
    context('初期化パラメータが与えられていた場合', () => {
      it('stateとして保持する', () => {
        const initState = testData();
        const store = createFreezableStore(initState);
        assert(store.state, initState);
      });

      it('初期化パラメータの変更は影響を受けない', () => {
        const initState = testData();
        const store = createFreezableStore(initState);
        const { state } = store;

        initState.name = 'jonny';
        initState.favorite.color = 'blue';
        initState.children[0].name = 'jimmy';
        initState.positions[0][1] = 123;

        assertState(state, testData());
      });
    });
  });

  describe('stateの変更', () => {
    context('assign()を介さない変更の場合', () => {
      let store;
      let state;

      beforeEach(() => {
        store = createFreezableStore(testData());
        state = store.state;
      });

      it('直接の変更はエラーとして無効にする', () => {
        assert.throws(() => {
          state.name = 'jonny';
        }, Error);
        assert.throws(() => {
          state.favorite.color = 'blue';
        }, Error);
        assert.throws(() => {
          state.children[0].name = 'jimmy';
        }, Error);
        assert.throws(() => {
          state.children[0] = {
            name: 'jimmy',
            age: 9999
          };
        }, Error);
        assert.throws(() => {
          state.positions[0][0] = 125;
        }, Error);
        assertState(state, testData());
      });

      it('直接の追加はエラーとして無効にする', () => {
        assert.throws(() => {
          state.sex = 'male';
        }, Error);
        assert(state.sex === undefined);

        assert.throws(() => {
          state.children[2] = {
            name: 'jimmy',
            age: 9999
          };
        }, Error);
        assert.throws(() => {
          state.positions.push([ 7, 8 ]);
        }, Error);

        assertState(state, testData());
      });

      it('直接の削除はエラーとして無効にする', () => {
        assert.throws(() => {
          delete state.name;
        }, Error);
        assert.throws(() => {
          delete state.favorite.color;
        }, Error);
        assert.throws(() => {
          delete state.children[0].name;
        }, Error);
        assert.throws(() => {
          delete state.children[1];
        }, Error);
        assert.throws(() => {
          state.positions.splice(2)
        }, Error);
        assertState(state, testData());
      });
    });
  });

  describe('#assign()', () => {
    it('stateに反映する', () => {
      const store = createFreezableStore();
      const { state } = store;
      store.assign(testData());
      assertState(state, testData());
    });
  });
  describe('#observe()', () => {
    let changeHandler;
    let store;
    let state;

    beforeEach(() => {
      changeHandler = sinon.spy();
      store = createFreezableStore(testData());
      store.observe(changeHandler);
      state = store.state;
    });

    it('イベントハンドラを設定し、assignを検知する', () => {
      const changeProp = {
        name: 'jonny',
        age: 100
      };
      store.assign(changeProp);
      assertState(state, Object.assign(testData(), changeProp));
      assert(changeHandler.calledOnce === true);
    });
  });
});
