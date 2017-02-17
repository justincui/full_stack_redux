import {Map, List} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
}

function vote(state, entry) {
    const currentPair = state.getIn(['vote', 'pair']);
    if (currentPair && currentPair.includes(entry)) {
        const nextState = state.set('hasVoted', Map({
            round: state.getIn(['vote', 'round'], 0),
            entry,
        }));
        return nextState;
    }
    else {
        return state;
    }
}

function resetVote(state) {
    const hasVoted = state.get('hasVoted');
    const currentRound = state.getIn(['vote', 'round'], 0);
    if (hasVoted && hasVoted.get('round') !== currentRound) {
        return state.remove('hasVoted');
    }
    else {
        return state;
    }
}

export default function reducer(state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return resetVote(setState(state, action.state));
        case 'VOTE':
            return vote(state, action.entry);
    }
    return state;
}