/**
 * Created by justincui on 2/11/17.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('has an initial state', ()=>{
        const action = {type: 'SET_ENTRIES', entries:['AA']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries:['AA'],
        }));
    });

    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['AA', 'BB']};
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            entries: ['AA', 'BB'],
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['AA', 'BB'],
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                round:1,
                pair: ['AA', 'BB'],
            },
            entries: [],
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['AA', 'BB'],
            },
            entries: [],
        });
        const acton = {type: 'VOTE', entry: 'AA'};
        const nextState = reducer(initialState, acton);
        expect(nextState).to.equal(fromJS({
            vote:{
                pair:['AA', 'BB'],
                tally:{'AA':1},
            },
            entries:[],
        }));
    });

    it('can be used with reduce', ()=>{
        const actions=[
            {type:'SET_ENTRIES', entries:['AA', 'BB']},
            {type:'NEXT'},
            {type:'VOTE', entry:'AA'},
            {type:'VOTE', entry:'BB'},
            {type:'VOTE', entry:'AA'},
            {type:'NEXT'},
        ];
        const finalState=actions.reduce(reducer, undefined);
        expect(finalState).to.equal(fromJS({
            winner:'AA',
        }));
    });

});