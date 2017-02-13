/**
 * Created by justincui on 2/11/17.
 */
import {expect} from 'chai';
import {describe} from 'mocha';

import {Map, fromJS} from 'immutable';

import makeStore from '../src/store';

describe('store', ()=>{
    it('is a Redux store configured with the correct reducer', ()=>{
        const store=makeStore();
        expect(store.getState()).to.equal(Map());
        store.dispatch({type:'SET_ENTRIES', entries:['AA', 'BB']});
        expect(store.getState()).to.equal(fromJS({
            entries:['AA', 'BB'],
        }))
    });
});