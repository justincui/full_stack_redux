/**
 * Created by justicui on 2/16/17.
 */

export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function vote(entry) {
    return {
        meta:{remote:true},
        type: 'VOTE',
        entry
    }
}