import {describe} from 'mocha';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

import {List, Map} from 'immutable';

describe('application logic', ()=>{

  describe('setEntries', ()=>{
    it('adds the entries to the state', ()=>{
      const state=Map();
      const entries=List.of('AA', 'BB');
      const nextState=setEntries(state, entries);
      expect(nextState).to.equal(Map({entries: List.of('AA', 'BB')}));
    });
  });

  describe('next', ()=>{
    it('takes the next two entries under vote', ()=>{
      const state=Map({
        entries: List.of('AA', 'BB', 'CC')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({pair: List.of('AA', 'BB')}),
        entries: List.of('CC')
      }));
    });
  });

  describe('vote', ()=>{
    it('creates a tally for the voted entry', ()=>{
      const state = Map({
        vote:Map({pair: List.of('AA', 'BB')}),
        entries: List()
      });
      const nextState=vote(state, 'AA');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('AA', 'BB'),
          tally: Map({
            'AA':1
          })
        }),
        entries: List()
      }));
    });
    it('adds to existing tally for the voted entry', ()=>{
      const state=Map({
        vote: Map({
          pair: List.of('AA', 'BB'),
          tally: Map({
            'AA':3,
            'BB':2
          }),
        }),
        entries:List()
      });
      const nextState = vote(state, 'AA');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('AA', 'BB'),
          tally: Map({'AA':4, 'BB':2}),
        }),
        entries:List()
      }));
    });
    it('puts winner of current vote back to entries', ()=>{
      const state = Map({
        vote: Map({
          pair: List.of('AA', 'BB'),
          tally:Map({'AA':4, 'BB':2}),
        }),
        entries: List.of('CC', 'DD', 'EE'),
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({pair:List.of('CC', 'DD')}),
        entries: List.of('EE', 'AA'),
      }));
    });
  });
});
