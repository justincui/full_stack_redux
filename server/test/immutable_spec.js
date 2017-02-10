/**
 * Created by justicui on 2/10/17.
 */
import {describe} from 'mocha';
import {assert} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', ()=>{
  describe('a number', ()=>{
    function increment(currentState){
      return currentState+1;
    }
    it('is immutable', ()=>{
      let state=42;
      let nextState = increment(state);
      assert(nextState===43);
      assert(state===42);
    })
  });
  describe('a Tree', ()=>{
    function addItem(currentState, item){
      return currentState.set('content',
        currentState.get('content').push(item));
    }
    it('is immutable', ()=>{
      let state = Map({
        content: List.of('AA', 'BB')});
      let nextState = addItem(state, 'CC');
      assert.equal(nextState, Map({content: List.of('AA', 'BB', 'CC')}));
      assert.equal(state, Map({content:List.of('AA', 'BB')}));
    });
  });
});