/**
 * Created by justincui on 2/11/17.
 */
import {INITIAL_STATE, setEntries, vote, next} from './core';

export default function reducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return vote(state, action.entry);
    }
    return state;
}